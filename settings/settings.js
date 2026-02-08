/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

// tab 2 stuff here
function displayLogs(lines) {
	$('#loglines').html(lines);
}

function updateLogs() {
	try {
		displayLogs('');
		Homey.api('GET', 'getlogs/', null)
			.then((result) => {
				let lines = '';
				result
					.reverse()
					.forEach((line) => {
						const logLine = line
							.replace(' [MyApp]', '')
							.replace(' [ManagerDrivers]', '')
							.replace(/\[Device:(.*?)\]/, '[dev]')
							.replace(/\[Driver:(.*?)\]/, '[$1]');
						lines += `${logLine}<br />`;
					});
				displayLogs(lines);
			})
			.catch((err) => {
				displayLogs(err);
			});
	} catch (e) {
		displayLogs(e);
	}
}

function deleteLogs() {
	Homey.confirm(Homey.__('settings.tab2.deleteWarning'), 'warning', (error, result) => {
		if (result) {
			Homey.api('GET', 'deletelogs/', null)
				.then(() => {
					Homey.alert(Homey.__('settings.tab2.deleted'), 'info');
					updateLogs();
				})
				.catch((err) => {
					Homey.alert(err.message, 'error');
				});
		}
	});
}

// generic stuff here
function showTab(tab) {
	if (tab === 2) updateLogs();
	$('.tab').removeClass('tab-active');
	$('.tab').addClass('tab-inactive');
	$(`#tabb${tab}`).removeClass('tab-inactive');
	$(`#tabb${tab}`).addClass('active');
	$('.panel').hide();
	$(`#tab${tab}`).show();
}

function onHomeyReady(homeyReady) {
	Homey = homeyReady;
	showTab(1);
	Homey.ready();
}
