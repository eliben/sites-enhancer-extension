console.log("hello from content script");

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'apply-format-code') {
    console.log('Got message:', request);
    document.execCommand('fontName', false, 'courier');
  }
});

