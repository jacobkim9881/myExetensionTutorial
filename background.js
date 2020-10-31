chrome.runtime.onInstalled.addListener(() => {

    chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
            
            })
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
         }])     
    });

});

chrome.runtime.onMessage.addListener((msg) => {
    console.log('get message :', msg);
  });

console.log('hello');