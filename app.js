/*
Copyright 2016 - 2022, Robin de Gruijter (gruijter@hotmail.com)

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
along with com.gruijter.callmebot.  If not, see <http://www.gnu.org/licenses/>.
*/

'use strict';

const Homey = require('homey');
const fs = require('fs');

const Logger = require('./captureLogs.js');

class MyApp extends Homey.App {

	onInit() {
		if (!this.logger) this.logger = new Logger({ name: 'log', length: 200, homey: this.homey });
		this.log('CallMeBot app is running!');
		// register some listeners
		process.on('unhandledRejection', (error) => {
			this.error('unhandledRejection! ', error.message);
		});
		process.on('uncaughtException', (error) => {
			this.error('uncaughtException! ', error);
		});
		this.homey
			.on('unload', async () => {
				this.log('app unload called');
				// save logs to persistant storage
				await this.logger.saveLogs();
			})
			.on('memwarn', () => {
				this.log('memwarn!');
			});

		this.deleteAllImageFiles();
		this.registerFlowListeners();
	}

	//  stuff for frontend API
	deleteLogs() {
		return this.logger.deleteLogs();
	}

	getLogs() {
		return this.logger.logArray;
	}

	// init stuff
	deleteAllImageFiles() {
		try {
			const files = fs.readdirSync('./userdata');
			files.forEach((file) => {
				if (file !== ('log.json')) {
					this.log('deleting', file);
					fs.unlinkSync(`./userdata/${file}`);
				}
			});
			this.log('Deleted all image files');
		} catch (error) { this.error(error); }
	}

	// ==============FLOW CARD STUFF======================================
	registerFlowListeners() {
		// action cards
		const send = this.homey.flow.getActionCard('send');
		send.registerRunListener((args) => args.device.send(args, 'flow'));

		const sendGroup = this.homey.flow.getActionCard('send_group');
		sendGroup.registerRunListener((args) => args.device.sendGroup(args, 'flow'));

		const sendVoice = this.homey.flow.getActionCard('send_voice');
		sendVoice.registerRunListener((args) => args.device.sendVoice(args, 'flow'));

		const sendImage = this.homey.flow.getActionCard('send_image');
		sendImage.registerRunListener((args) => args.device.sendImage(args, 'flow'));
	}

}

module.exports = MyApp;

/*
https://www.callmebot.com/
*/
