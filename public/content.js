
// Initialize bot state from storage
let isBotActive = false;

// Listen for messages from the extension popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'TOGGLE_BOT') {
    isBotActive = message.isActive;
    // Update local storage
    localStorage.setItem('securebotState', JSON.stringify(isBotActive));
    // Refresh the page to update bot state
    window.location.reload();
  }
});

// Initialize bot state from storage on page load
document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get(['botActive'], (result) => {
    isBotActive = result.botActive || false;
    localStorage.setItem('securebotState', JSON.stringify(isBotActive));
  });
});
