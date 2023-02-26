/*
Copyright 2021 -2023, Robin de Gruijter (gruijter@hotmail.com)

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
const fs = require('fs');

const util = require('util');

const setTimeoutPromise = util.promisify(setTimeout);

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
		this.onInit();
		return Promise.resolve('settings are saved'); // string can be returned to user
	}

	setCapability(capability, value) {
		if (this.hasCapability(capability)) {
			// only update changed values
			if (value !== this.getCapabilityValue(capability)) {
				this.setCapabilityValue(capability, value)
					.catch((error) => {
						this.log(error, capability, value);
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

	async deleteFile(filename, delay) {
		try {
			await setTimeoutPromise(delay, 'waiting is done');
			if (fs.existsSync(filename)) fs.unlinkSync(filename);
			this.log('deleted', filename);
		} catch (error) { this.error(error); }
	}

	async sendImage(args) {
		try {
			// rate limit fb
			const { driverId } = args.device.driver.ds;
			if (driverId === 'fb') {
				if ((Date.now() - this.lastFbImageSent) < 65000) throw Error('Only 1 image per minute allowed');
				this.lastFbImageSent = Date.now();
			}

			// get the contents of the image
			const image = await args.droptoken;
			if (!image || !image.getStream) throw Error('No valid image');
			const imgStream = await image.getStream();

			// set filename for save on Homey
			let { filename } = imgStream; // Date.now().toString() + '.img';
			filename = `${Date.now().toString()}_${filename}`;

			// save the image and wait for finish
			await new Promise((fulfill) => {
				imgStream.on('finish', fulfill);
				imgStream.on('close', fulfill);
				imgStream.on('error', fulfill);
				imgStream.on('unpipe', fulfill);
				const targetFile = fs.createWriteStream(`/userdata/${filename}`);
				imgStream.pipe(targetFile);
			});

			// delete the image after 30 seconds delay
			this.deleteFile(`/userdata/${filename}`, 30 * 1000);

			// send the image
			// await setTimeoutPromise(5000, 'waiting is done');
			const args2 = { ...args };
			const cloudID = await this.homey.cloud.getHomeyId();
			// args2.imgUrl = image.cloudUrl; // this is a cloudlink of the image. Image is updated on fetch by CallMeBot
			args2.imgUrl = `https://${cloudID}.connect.athom.com/app/com.gruijter.callmebot/userdata/${filename}`;
			const result = await this.driver.sendImage(args2);
			this.updateLastSent();
			this.log(result);
			return Promise.resolve(true);
		} catch (error) {
			this.error(error);
			return Promise.reject(error);
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
			return Promise.resolve(true);
		} catch (error) {
			this.error(error);
			return Promise.reject(error);
		}
	}

	async send(args) {
		try {
			const result = await this.driver.send(args);
			this.updateLastSent();
			this.log(result);
			return Promise.resolve(true);
		} catch (error) {
			this.error(error);
			return Promise.reject(error);
		}
	}

	async sendGroup(args) {
		try {
			const result = await this.driver.sendGroup(args);
			this.updateLastSent();
			this.log(result);
			return Promise.resolve(true);
		} catch (error) {
			this.error(error);
			return Promise.reject(error);
		}
	}

}

module.exports = Device;

/*

*/
