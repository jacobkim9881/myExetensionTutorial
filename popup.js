document.getElementById('button').addEventListener('click', () => {

chrome.runtime.sendMessage(undefined,
    "sent message from popup."
);

});

document.getElementById('button2').addEventListener('click', () => {

        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.tabs.sendMessage(
            tabs[0].id,
            "This is message from popup"
          );
    });
    
    });