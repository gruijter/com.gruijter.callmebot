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
    try {
      this.log('Pairing of new message receiver started');

      let number = '';
      let apikey = '';

      session.setHandler('login', async (data) => {
        number = data.username.replace(/ /gi, '');
        apikey = data.password;

        const args = {
          device: {
            getSettings: () => ({ number, apikey }),
            driver: {
              ds: {
                driverId: this.ds.driverId,
              },
            },
          },
          msg: 'Homey can send messages to this device!',
        };
        const credentialsAreValid = await this.send(args);
        return credentialsAreValid;
      });

      session.setHandler('list_devices', () => {
        const device = {
          name: `${this.ds.driverId}_${number}`,
          data: {
            id: `${this.ds.driverId}_${number}`,
          },
          settings: {
            number,
            apikey,
          },
          capabilities: ['last_sent'],
        };
        return [device];
      });

    } catch (error) {
      this.error(error);
    }

  }

  // https://signal.callmebot.com/signal/send.php?phone=[phone_number]&apikey=[your_apikey]&image=[url_image]
  // https://api.callmebot.com/facebook/send.php?apikey=[your_apikey]&image=[image_url]
  async sendImage(args) {
    const { driverId } = args.device.driver.ds;
    const query = {};
    // if (driverId === 'telegram') query.user = args.device.getSettings().number;
    if (driverId === 'signal' || driverId === 'whatsapp') {
      query.phone = args.device.getSettings().number;
    }
    if (driverId === 'signal' || driverId === 'whatsapp' || driverId === 'fb') {
      query.apikey = args.device.getSettings().apikey;
    }
    query.image = args.imgUrl;
    const headers = {
      // 'Cache-Control': 'no-cache',
    };
    const options = {
      hostname: this.ds.hostname || 'api.callmebot.com',
      path: `${this.ds.imagePath}?${toQueryString(query)}`,
      headers,
      method: 'GET',
    };
    const result = await this._makeHttpsRequest(options, '');
    if (result.statusCode !== 200) {
      throw new Error(`${result.statusCode}: ${stripHtml(result.body).slice(0, 300)}`);
    }
    const strippedString = stripHtml(result.body);
    const signalOK = result.body.includes('Image sent to');
    const fbOK = result.body.includes('Message sent');

    if (!(signalOK || fbOK)) throw new Error(strippedString);
    return strippedString;
  }

  // http://api.callmebot.com/start.php?user=@username&text=This+is+a+robot+calling+you+to+inform+you+about+something+urgent+that+is+happening&lang=en-GB-Standard-B&rpt=2
  async sendVoice(args) {
    const langId = args.language?.id || args.language;
    const voiceId = args.voice?.id || args.voice;
    const query = {
      user: args.device.getSettings().number,
      text: args.msg,
      lang: `${langId}-Standard-${voiceId}`,
      rpt: 2, // number to repeat msg
    };
    const headers = {
      'Cache-Control': 'no-cache',
    };
    const options = {
      hostname: this.ds.hostname || 'api.callmebot.com',
      path: `${this.ds.voicePath}?${toQueryString(query)}`,
      headers,
      method: 'GET',
    };
    const result = await this._makeHttpsRequest(options, '');
    if (result.statusCode !== 200) {
      throw new Error(`${result.statusCode}: ${stripHtml(result.body).slice(0, 300)}`);
    }

    let strippedString = stripHtml(result.body);
    const telegramOK = result.body.includes('Call ended after');
    if (telegramOK) strippedString = 'Call successfully ended';
    if (!telegramOK) throw new Error(strippedString);
    return strippedString;
  }
  // https://signal.callmebot.com/signal/send.php?phone=[phone_number]&apikey=[your_apikey]&text=[message]
  // https://api.callmebot.com/whatsapp.php?phone=[phone_number]&text=[message]&apikey=[your_apikey]
  // https://api.callmebot.com/facebook/send.php?apikey=[your_apikey]&text=[message]
  // https://api.callmebot.com/text.php?user=[username]&text=[text]&html=[html_format]&links=[link_preview]

  async send(args) {
    const { driverId } = args.device.driver.ds;
    const query = {
      text: args.msg,
    };
    if (driverId === 'telegram') query.user = args.device.getSettings().number;
    if (driverId === 'signal' || driverId === 'whatsapp') {
      query.phone = args.device.getSettings().number;
    }
    if (driverId === 'signal' || driverId === 'whatsapp' || driverId === 'fb') {
      query.apikey = args.device.getSettings().apikey;
    }

    const headers = {
      'Cache-Control': 'no-cache',
    };
    const options = {
      hostname: this.ds.hostname || 'api.callmebot.com',
      path: `${this.ds.path}?${toQueryString(query)}`,
      headers,
      method: 'GET',
    };
    const result = await this._makeHttpsRequest(options, '');
    if (result.statusCode !== 200) {
      throw new Error(`${result.statusCode}: ${stripHtml(result.body).slice(0, 300)}`);
    }

    let strippedString = stripHtml(result.body);
    const signalOK = result.body.includes('Message sent to');
    const whatsappOK = result.body.includes('Message queued');
    const fbOK = result.body.includes('Message sent');
    const telegramOK = result.body.includes('Status: Successful');
    if (telegramOK) strippedString = 'Status: Successful';
    if (!(signalOK || whatsappOK || fbOK || telegramOK)) throw new Error(strippedString);
    return strippedString;
  }
  // https://api.callmebot.com/telegram/group.php?apikey=[apikey]&text=[text message]&html=[html_format]

  async sendGroup(args) {
    const query = {
      apikey: args.device.getSettings().apikey,
      // html: 'no',
      text: args.msg,
    };
    const headers = {
      // 'Cache-Control': 'no-cache',
    };
    const options = {
      hostname: this.ds.hostname || 'api.callmebot.com',
      path: `${this.ds.groupPath}?${new URLSearchParams(query).toString()}`,
      headers,
      method: 'GET',
    };
    const result = await this._makeHttpsRequest(options, '');
    if (result.statusCode !== 200) {
      throw new Error(`${result.statusCode}: ${stripHtml(result.body).slice(0, 300)}`);
    }
    let strippedString = stripHtml(result.body);
    const telegramOK = result.body.includes('Status: Successful');
    if (telegramOK) strippedString = 'Status: Successful';
    if (!telegramOK) throw new Error(strippedString);
    return strippedString;
  }

  async _makeHttpsRequest(options, postData, timeout) {
    const url = `https://${options.hostname}${options.path}`;
    const signal = AbortSignal.timeout(timeout || 30000);

    try {
      const response = await fetch(url, {
        method: options.method,
        headers: options.headers,
        body: postData || undefined,
        signal,
      });
      const body = await response.text();
      return {
        statusCode: response.status,
        body,
      };
    } catch (error) {
      this.error(error);
      throw error;
    }
  }
}

module.exports = Driver;
