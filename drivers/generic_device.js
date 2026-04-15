/*
Copyright 2016 - 2026, Robin de Gruijter (gruijter@hotmail.com)

This file is part of com.gruijter.callmebot.

com.gruijter.callmebot is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

com.gruijter.callmebot is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with com.gruijter.callmebot. If not, see <http://www.gnu.org/licenses/>.
*/

'use strict';

const Homey = require('homey');
const fs = require('fs'); // for createWriteStream
const fsPromises = require('fs').promises;
const { pipeline } = require('stream/promises');

class Device extends Homey.Device {

  // this method is called when the Device is inited
  async onInitDevice() {
    // this.log('device init: ', this.getName(), 'id:', this.getData().id);
    try {
      // init some stuff
      this.settings = await this.getSettings();

    } catch (error) {
      this.error(error);
    }
  }

  // this method is called when the Device is added
  async onAdded() {
    this.log(`Added as device: ${this.getName()}`);
  }

  // this method is called when the Device is deleted
  onDeleted() {
    this.stopPolling();
    // this.destroyListeners();
    this.log(`Deleted as device: ${this.getName()}`);
  }

  onRenamed(name) {
    this.log(`Device renamed to: ${name}`);
  }

  // this method is called when the user has changed the device's settings in Homey.
  async onSettings() { // { newSettings }) {
    this.log(`${this.getName()} device settings changed by user`);
    // do callback to confirm settings change
    this.onInit().catch(this.error);
    return Promise.resolve('settings are saved'); // string can be returned to user
  }

  setCapability(capability, value) {
    if (this.hasCapability(capability)) {
      // only update changed values
      if (value !== this.getCapabilityValue(capability)) {
        this.setCapabilityValue(capability, value)
          .catch((error) => {
            this.error(error, capability, value);
          });
      }
    }
  }

  updateLastSent() {
    const ds = new Date();
    const date = ds.toString().substring(4, 11);
    const time = ds.toLocaleTimeString('nl-NL', { hour12: false, timeZone: this.homey.clock.getTimezone() }).substring(0, 5);
    this.setCapability('last_sent', `${date} ${time}`);
  }

  async deleteFile(filename) {
    try {
      await fsPromises.unlink(filename);
      this.log('deleted', filename);
    } catch (error) {
      // It's okay if the file doesn't exist (e.g., already deleted).
      if (error.code !== 'ENOENT') {
        this.error('Error deleting temp file:', error);
      }
    }
  }

  async sendImage(args) {
    // get the image token
    const image = await args.droptoken;
    if (!image) throw new Error('No valid image provided.');

    // rate limit fb
    const { driverId } = args.device.driver.ds;
    if (driverId === 'fb') {
      if ((Date.now() - this.lastFbImageSent) < 65000) throw new Error('Only 1 image per minute allowed for Facebook.');
      this.lastFbImageSent = Date.now();
    }

    const args2 = { ...args };
    let tempImagePath = null;

    try {
      // Prefer using the existing public cloud URL if available.
      if (image.cloudUrl) {
        this.log('Using existing image cloudUrl');
        args2.imgUrl = image.cloudUrl;
      } else {
        // If no cloudUrl, stage the image locally and create a public connect URL.
        this.log('Staging image locally...');
        if (!image.getStream) throw new Error('Image is not streamable.');

        const imgStream = await image.getStream();
        const filename = `${Date.now()}_${imgStream.filename || 'image.jpg'}`;
        tempImagePath = `/userdata/${filename}`;

        // Save the image stream to a temporary file using a robust pipeline.
        await pipeline(imgStream, fs.createWriteStream(tempImagePath));
        this.log('Image saved to', tempImagePath);

        // Create a public URL for the staged file.
        const cloudID = await this.homey.cloud.getHomeyId();
        args2.imgUrl = `https://${cloudID}.connect.athom.com/app/com.gruijter.callmebot/userdata/${filename}`;
      }

      const result = await this.driver.sendImage(args2);
      this.updateLastSent();
      this.log(result);
      return true;
    } catch (error) {
      this.error(error);
      throw error; // Re-throw to notify the flow of failure.
    } finally {
      // Clean up the staged file after the API call is complete.
      if (tempImagePath) {
        // Use a small delay before deleting, just in case the API fetches the URL asynchronously after returning a 200 OK.
        setTimeout(() => {
          this.deleteFile(tempImagePath).catch(this.error);
        }, 5000); // 5-second delay
      }
    }
  }

  async sendVoice(args) {
    try {
      const now = Date.now();
      if ((now - this.lastVoiceCall) < 65 * 1000) throw Error('Only one voicecall per minute allowed');
      this.lastVoiceCall = now;
      const result = await this.driver.sendVoice(args);
      this.updateLastSent();
      this.log(result);
      return true;
    } catch (error) {
      this.error(error);
      throw error;
    }
  }

  async send(args) {
    try {
      const result = await this.driver.send(args);
      this.updateLastSent();
      this.log(result);
      return true;
    } catch (error) {
      this.error(error);
      throw error;
    }
  }

  async sendGroup(args) {
    try {
      const result = await this.driver.sendGroup(args);
      this.updateLastSent();
      this.log(result);
      return true;
    } catch (error) {
      this.error(error);
      throw error;
    }
  }

}

module.exports = Device;

/*

*/
