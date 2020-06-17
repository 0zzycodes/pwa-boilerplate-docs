let deferredInstallPrompt = null;
const installButton = document.getElementById('butInstall');
installButton.addEventListener('click', installApp);
// Add event listener for beforeinstallprompt event
window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);


function saveBeforeInstallPromptEvent(evt) {
  // Add code to save event & show the install button.
  deferredInstallPrompt = evt;
  // installButton.removeAttribute('hidden');
}


function installApp(evt) {
  // Add code show install prompt & hide the install button.
  console.log(evt);

  deferredInstallPrompt.prompt();
  // Hide the install button, it can't be called twice.
  // evt.srcElement.setAttribute('hidden', true);
  // Log user response to prompt.
  deferredInstallPrompt.userChoice.then(choice => {
    if (choice.outcome === 'accepted') {
      console.log('User accepted the A2HS prompt', choice);
    } else {
      console.log('User dismissed the A2HS prompt', choice);
    }
    deferredInstallPrompt = null;
  });
}

// Add event listener for appinstalled event
window.addEventListener('appinstalled', logAppInstalled);


function logAppInstalled(evt) {
  // Add code to log the event
  console.log('Install Successful.', evt);
}
