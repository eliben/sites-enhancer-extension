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

// Event listener for messages sent to the content script
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  // Formatting messages from the background script
  if (request.command === 'format-apply-code') {
    var newtext = '<code>' + getSelectionHtml() + '</code>'
    document.execCommand('insertHTML', false, newtext);
  } else if (request.command === 'format-remove') {
    document.execCommand('removeFormat', false, null);
  }
});

