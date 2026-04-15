/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

'use strict';

// tab 2 stuff here
function displayLogs(lines) {
  document.getElementById('loglines').innerHTML = lines;
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
  document.querySelectorAll('.tab').forEach((el) => {
    el.classList.remove('tab-active');
    el.classList.add('tab-inactive');
  });
  const activeTab = document.getElementById(`tabb${tab}`);
  if (activeTab) {
    activeTab.classList.remove('tab-inactive');
    activeTab.classList.add('tab-active');
  }
  document.querySelectorAll('.panel').forEach((el) => {
    el.style.display = 'none';
  });
  const activePanel = document.getElementById(`tab${tab}`);
  if (activePanel) {
    activePanel.style.display = 'block';
  }
  if (tab === 2) updateLogs();
}

function onHomeyReady(homeyReady) {
  window.Homey = homeyReady;
  homeyReady.ready();
  setTimeout(() => {
    showTab(1);
  }, 50);
}
