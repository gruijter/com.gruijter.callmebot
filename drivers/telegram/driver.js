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

const GenericDriver = require('../generic_driver');

const driverSpecifics = {
  driverId: 'telegram',
  path: '/text.php',
  voicePath: '/start.php',
  groupPath: '/telegram/group.php',
  recipientParam: 'user',
  usesApikey: false,
  // https://api.callmebot.com/text.php?user=[username]&text=[text]&html=[html_format]&links=[link_preview]
  // https://api.callmebot.com/start.php?user=[username]&text=[text]&lang=[language]&rpt=[repeat]
  // https://api.callmebot.com/telegram/group.php?apikey=[apikey]&text=[text message]&html=[html_format]
};

class telegramDriver extends GenericDriver {
  onInit() {
    this.ds = driverSpecifics;
    this.onDriverInit().catch(this.error);
  }
}

module.exports = telegramDriver;
