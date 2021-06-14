'use strict';

const Homey = require('homey');

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
		this.registerFlowListeners();

	}

	//  stuff for frontend API
	deleteLogs() {
		return this.logger.deleteLogs();
	}

	getLogs() {
		return this.logger.logArray;
	}

	// ==============FLOW CARD STUFF======================================
	registerFlowListeners() {
		// action cards
		const send = this.homey.flow.getActionCard('send');
		send.registerRunListener((args) => args.device.send(args, 'flow'));

		const sendVoice = this.homey.flow.getActionCard('send_voice');
		sendVoice.registerRunListener((args) => args.device.sendVoice(args, 'flow'));
	}

}

module.exports = MyApp;

/*
https://www.callmebot.com/
*/
