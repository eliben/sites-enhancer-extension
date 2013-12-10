console.log("hello from content script");

// Generic JS utility to get currently selected text from a document.
function getSelectionHtml() {
  var html = "";
  if (typeof window.getSelection != "undefined") {
    var sel = window.getSelection();
    if (sel.rangeCount) {
      var container = document.createElement("div");
      for (var i = 0, len = sel.rangeCount; i < len; ++i) {
        container.appendChild(sel.getRangeAt(i).cloneContents());
      }
      html = container.innerHTML;
    }
  } else if (typeof document.selection != "undefined") {
    if (document.selection.type == "Text") {
      html = document.selection.createRange().htmlText;
    }
  }
  return html;
}

// Event listener for messages sent to us
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  // Formatting messages from the background script
  if (request.action === 'apply-format-code') {
    console.log('Got message:', request);
    console.log('Current selection is', getSelectionHtml());
    var newtext = '<code>' + getSelectionHtml() + '</code>'
    document.execCommand('insertHTML', false, newtext);
  }
});

