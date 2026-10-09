/* eslint-disable @typescript-eslint/no-unused-vars, strict -- functions are called from index.html */
/* eslint-disable no-undef */

'use strict';

// tab 2 stuff here
function displayLogs(lines) {
  document.getElementById('loglines').textContent = lines;
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
            lines += `${logLine}\n`;
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
  [1, 2].forEach((t) => {
    document.getElementById(`tab${t}`).style.display = t === tab ? '' : 'none';
    document.getElementById(`tabb${t}`).className = t === tab ? 'homey-button-primary' : 'homey-button-secondary';
  });
  if (tab === 2) updateLogs();
}

function onHomeyReady(homeyReady) {
  window.Homey = homeyReady;
  showTab(1);
  homeyReady.ready();
}
