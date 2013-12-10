chrome.commands.onCommand.addListener(function(command) {
  console.log('onCommand event received for message: ', command);
  if (command === 'apply-format-code') {
    console.log('asked to apply format code');
    console.log(document);

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id,
                                {action: "apply-format-code"},
                                function(response) {});
    });
  }
});
