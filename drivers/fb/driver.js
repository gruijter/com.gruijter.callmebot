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

const GenericDriver = require('../generic_driver');

const driverSpecifics = {
	driverId: 'fb',
	path: '/facebook/send.php',
	imagePath: '/facebook/send.php',
	// https://api.callmebot.com/facebook/send.php?apikey=[your_apikey]&text=[message]
	// https://api.callmebot.com/facebook/send.php?apikey=[your_apikey]&image=[image_url]
};

class fbDriver extends GenericDriver {
	onInit() {
		// this.log('driver onInit');
		this.ds = driverSpecifics;
		this.onDriverInit();
	}
}

module.exports = fbDriver;
