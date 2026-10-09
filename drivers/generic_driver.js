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

const stripHtml = (html) => html
  .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, ' ')
  .replace(/<\/?(p|h\d|br|div|li)\b[^>]*>/gi, ' ')
  .replace(/<[^>]+>/g, '')
  .replace(/\s+/g, ' ')
  .trim();

// CallMeBot expects a literal + in the phone number; keep %2B everywhere else (+ means space)
const toQueryString = (query) => new URLSearchParams(query).toString().replace(/(^|&)phone=%2B/, '$1phone=+');

class Driver extends Homey.Driver {

  async onDriverInit() {
    this.log('onDriverInit');
  }

  onPair(session) {
    this.log('Pairing of new message receiver started');

    let number = '';
    let apikey = '';

    session.setHandler('login', async (data) => {
      // without a recipient (fb) the username field is just a device name, so keep it as typed
      number = this.ds.recipientParam ? data.username.replace(/ /gi, '') : data.username.trim();
      apikey = data.password;
      await this.send({ number, apikey }, 'Homey can send messages to this device!');
      return true;
    });

    // without a recipient (fb) the name is not unique, so the id gets a timestamp instead
    session.setHandler('list_devices', () => [{
      name: this.ds.recipientParam ? `${this.ds.driverId}_${number}` : number || this.ds.driverId,
      data: {
        id: this.ds.recipientParam ? `${this.ds.driverId}_${number}` : `${this.ds.driverId}_${Date.now()}`,
      },
      settings: {
        number,
        apikey,
      },
      capabilities: ['last_sent'],
    }]);
  }

  // recipient and apikey params as required by this driver's CallMeBot API
  recipientQuery(settings) {
    const query = {};
    if (this.ds.recipientParam) query[this.ds.recipientParam] = settings.number;
    if (this.ds.usesApikey) query.apikey = settings.apikey;
    return query;
  }

  // CallMeBot returns HTML; success is only recognisable from the text in it
  async callApi(path, query, okTexts) {
    const url = `https://${this.ds.hostname || 'api.callmebot.com'}${path}?${toQueryString(query)}`;
    const response = await fetch(url, {
      headers: { 'Cache-Control': 'no-cache' },
      signal: AbortSignal.timeout(30000),
    });
    const body = await response.text();
    const message = stripHtml(body);
    if (response.status !== 200) throw new Error(`${response.status}: ${message.slice(0, 300)}`);
    if (!okTexts.some((text) => body.includes(text))) throw new Error(message);
    return message;
  }

  async send(settings, msg) {
    const query = { ...this.recipientQuery(settings), text: msg };
    const okTexts = ['Message sent to', 'Message queued', 'Message sent', 'Status: Successful'];
    const message = await this.callApi(this.ds.path, query, okTexts);
    return message.includes('Status: Successful') ? 'Status: Successful' : message;
  }

  async sendImage(settings, imgUrl) {
    const query = { ...this.recipientQuery(settings), image: imgUrl };
    return this.callApi(this.ds.imagePath, query, ['Image sent to', 'Message sent']);
  }

  // text is max 256 characters, rpt is the number of times it is spoken
  async sendVoice(settings, msg, langId, voiceId) {
    const query = {
      ...this.recipientQuery(settings),
      text: msg,
      lang: `${langId}-Standard-${voiceId}`,
      rpt: 2,
    };
    await this.callApi(this.ds.voicePath, query, ['Call ended after']);
    return 'Call successfully ended';
  }

  async sendGroup(settings, msg) {
    const query = { apikey: settings.apikey, text: msg };
    await this.callApi(this.ds.groupPath, query, ['Status: Successful']);
    return 'Status: Successful';
  }
}

module.exports = Driver;
