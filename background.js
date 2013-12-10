// Send a command to the content script
var send_command_to_content = function(cmd) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id,
                              {command: cmd},
                              function(response) {});
  });
}

chrome.commands.onCommand.addListener(function(command) {
  // Keeping these separate and disptached from here for possible future use.
  if (command === 'format-apply-code') {
    send_command_to_content(command);
  } else if (command === 'format-remove') {
    send_command_to_content(command);
  }
});
