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

  // this method is called when the Device is added
  onAdded() {
    this.log(`Added as device: ${this.getName()}`);
  }

  // this method is called when the Device is deleted
  onDeleted() {
    this.log(`Deleted as device: ${this.getName()}`);
  }

  onRenamed(name) {
    this.log(`Device renamed to: ${name}`);
  }

  // this method is called when the user has changed the device's settings in Homey.
  async onSettings() {
    this.log(`${this.getName()} device settings changed by user`);
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

  // runs a send action, updates last_sent and logs the result; errors are passed on to the flow
  async runSend(action) {
    try {
      const result = await action();
      this.updateLastSent();
      this.log(result);
      return true;
    } catch (error) {
      this.error(error);
      throw error;
    }
  }

  async send(args) {
    return this.runSend(() => this.driver.send(this.getSettings(), args.msg));
  }

  async sendGroup(args) {
    return this.runSend(() => this.driver.sendGroup(this.getSettings(), args.msg));
  }

  async sendVoice(args) {
    return this.runSend(() => {
      const now = Date.now();
      if ((now - this.lastVoiceCall) < 65 * 1000) throw Error('Only one voicecall per minute allowed');
      this.lastVoiceCall = now;
      const langId = args.language?.id || args.language;
      const voiceId = args.voice?.id || args.voice;
      return this.driver.sendVoice(this.getSettings(), args.msg, langId, voiceId);
    });
  }

  async sendImage(args) {
    return this.runSend(async () => {
      const image = await (args.image || args.droptoken);
      if (!image) throw new Error('No valid image provided.');

      if (this.driver.ds.driverId === 'fb') {
        if ((Date.now() - this.lastFbImageSent) < 65000) throw new Error('Only 1 image per minute allowed for Facebook.');
        this.lastFbImageSent = Date.now();
      }

      if (image.cloudUrl) {
        this.log('Using existing image cloudUrl');
        return this.driver.sendImage(this.getSettings(), image.cloudUrl);
      }

      // no cloudUrl: stage the image in /userdata, which is reachable through the Homey cloud url
      if (!image.getStream) throw new Error('Image is not streamable.');
      const imgStream = await image.getStream();
      const filename = `${Date.now()}_${imgStream.filename || 'image.jpg'}`;
      const tempImagePath = `/userdata/${filename}`;
      try {
        await pipeline(imgStream, fs.createWriteStream(tempImagePath));
        const cloudID = await this.homey.cloud.getHomeyId();
        const imgUrl = `https://${cloudID}.connect.athom.com/app/com.gruijter.callmebot/userdata/${filename}`;
        return await this.driver.sendImage(this.getSettings(), imgUrl);
      } finally {
        // delay, in case CallMeBot fetches the image after it has responded
        this.homey.setTimeout(() => {
          this.deleteFile(tempImagePath).catch(this.error);
        }, 5000);
      }
    });
  }

}

module.exports = Device;

/*

*/
