## Why I made my extensions?
To every coder/designer who handles CSS, it makes web pages more looking nice. Whenever some modules or gif tweets show pretty and nice CSS, a thought hit me why users should experience CSS effects but why don't users equip customized CSS effects on their web? 

## What are extensions? 
![chrome web store image](https://dev-to-uploads.s3.amazonaws.com/i/rj5necxen0fzd8mnnuzs.png)

Extensions are made of HTML, Javascript, and CSS. By executing only defined functions on javascript files of extensions, user experience is supported. For example, extensions can show the user some products user could like based on cookies and requests extensions can read, or on certain websites, extensions could add CSS or javascript or both. Extensions are created by Google and used on most browsers. Personally most of all it was nice that uses experience added user experience by CSS on surfing whole web pages(It is also possible when all URL is allowed on manifest.json) like dark mode browsers. 

### manifest.json 
This JSON file shows the information of extensions. But also have a list of scripts that are executed in the extensions while the user visits websites. It is most important for making extensions that only listed functions in manifest.json file are allowed to use. That means if you didn't list functions on the manifest file then the browser won't allow using the extensions. Using only listed ones, extensions would be not used as hacking users' information tools. 

## Let's make extensions sending log 'hello' on background script
First, need to make an extensions folder.
```
mkdir myExtensions
cd myExtensions
```
In myExtensions folder, make manifest.json file.

```json
{
    "name": "My Extension",
    "version": "1.0",
    "description": "This is example Extension",
    "content_security_policy": "default-src 'self'",
    "manifest_version": 2
  }
```

Put these lines into manifest.json
```json
    "background": {
      "scripts": ["background.js"],
      "persistent": false
    },
    
```

Now your manifest should be,
```json
{
    "name": "My Extension",
    "version": "1.0",
    "description": "This is example Extension",
    "content_security_policy": "default-src 'self'",
        "background": {
      "scripts": ["background.js"],
      "persistent": false
    },
    "manifest_version": 2
  }
```

Make background.js.

```js
console.log("hello.")
```

Go to chrome browser and put this address into the address bar,
chrome://extensions/
Turn on Developer mode and click LOAD UNPACKED
Load your extension folder.
Click the background page link in the listed extension box.

![Uploading extensions for developer mode](https://dev-to-uploads.s3.amazonaws.com/i/qynqwp5l8vn61kq2cst6.png)

Now you will see 'hello' log on the new window. This background javascript file logs 'hello' on the console. Because using background js file is allowed by listing on manifest.json file.

![Hello message from background](https://dev-to-uploads.s3.amazonaws.com/i/rclc3f7z0qd3ep0r4cc2.png)

## Adding CSS on the browser while surfing.
With content script browser's CSS could be changed or a javascript file can be executed on the browser. For example, extensions can add CSS.

Add content script on manifest.json.
```json
"content_scripts": [
      {
        "matches": ["https://*/*"],
        "js": ["contents.js"]
      }
    ],
```

Now, manifest.json should look like this,
```json
{
    "name": "My Extension",
    "version": "1.0",
    "description": "This is example Extension",
    "content_security_policy": "default-src 'self'",
        "background": {
      "scripts": ["background.js"],
      "persistent": false
    },
"content_scripts": [
      {
        "matches": ["https://*/*"],
        "js": ["contents.js"]
      }
    ],
    "manifest_version": 2
  }
```
Means while surfing web on 'https://\*/*' which means every address, content.js file is allowed to be executed.

Add some content in contents.js
```js
document.body.style.borderStyle = 'solid'
document.body.style.borderWidth = '5px'
document.body.animate([
    {
        borderColor: 'hsl(301, 100%, 82%)',
    },
    {
        borderColor: 'white',
    },
    {
        borderColor: 'hsl(204, 100%, 82%)',
    },
    {
        borderColor: 'white',
    }
], 5000)
document.body.style.borderColor = 'white'
```
Listing content script on manifest.json, on browser window CSS or js can affect. That's why only defined functions are listed because extensions could change browser's HTML tags to put user's personal information to intercept. 

After reload button clicked on myExtension box on chrome extensions, background's border style changes for every page.

![content page CSS](https://dev-to-uploads.s3.amazonaws.com/i/bfdab9li06lxckq4z50p.gif)

## Sending messages from content js file to background js file
Communicating among javascript files is possible too. Content js file or background file can also send or get a message. 

To send a message on content.js file runtime is needed. 

```js
chrome.runtime.sendMessage(undefined,
          "sent message."
);
```

This runtime will send a message to js file where it uses onMessage event. Runtime is also used many times for extensions. 

### Message type
Messages could be sent with object type too. Like
```js
let obj = {name : 'message',
message: {title: 'test',
                  explain: 'this is test'}
}
```

content.js file should look like
```js
document.body.style.borderStyle = 'solid'
document.body.style.borderWidth = '5px'
document.body.animate([
    {
        borderColor: 'hsl(301, 100%, 82%)',
    },
    {
        borderColor: 'white',
    },
    {
        borderColor: 'hsl(204, 100%, 82%)',
    },
    {
        borderColor: 'white',
    }
], 5000)
document.body.style.borderColor = 'white'

chrome.runtime.sendMessage(undefined,
    "sent message."
);
```

Now on background js file, there should be an event to get messages. Put this into background.js.

```js
chrome.runtime.onMessage.addListener((msg) => {
  console.log('get message :', msg);
});
```

Background file should look like
```js
chrome.runtime.onMessage.addListener((msg) => {
    console.log('get message :', msg);
  });

console.log('hello');
```

Now see there are logs when pages change.
```js
//background.js:19 hello
//background.js:16 get message : sent message.
```

## Sending messages with popup js file to background js file
There is popup javascript with HTML file. 

### What is popup at extensions?
Popup is another javascript file with HTML file which is opened by clinking plugin icon on the browser. It could be a general HTML file under listing on manifest.json file. 

To use popup, it should be listed on manifest.json file. 
```json
      {
        "page_action": {
        "default_popup": "popup.html"
      }
      }
```
manifest.json should look like this
```json
{
    "name": "My Extension",
    "version": "1.0",
    "description": "This is example Extension",
    "content_security_policy": "default-src 'self'",
        "background": {
      "scripts": ["background.js"],
      "persistent": false
    },
"content_scripts": [
      {
        "matches": ["https://*/*"],
        "js": ["contents.js"]
      }
    ],
  "page_action": {
        "default_popup": "popup.html"
      },
    "manifest_version": 2
  }
```

To show HTML files you made after clicking extensions plugin button, exetensions functions should be in background file.

```js
chrome.runtime.onInstalled.addListener(() => {

    chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
            // put conditions for example pageUrl: { hostEquals: 'www.google.com', schemes: ['https'] }
            })
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
         }])     
    });

});
```
When extensions are installed a function is executed. declarativeContent is for page action and depending on conditions, certain CSS or certain url declarativeContent can show popup html page, change plugin's icon or execute javascript file. The background file means without conditions which means popup can be shown on any url while page changing.

To activate declarativeContent, of course it should be listed on manifest.json.

```json
{
    "permissions": ["declarativeContent"],
}
```

When using functions of browser exetensions, they should be listed on permissions at manifest.json. manifest.json should look like this

```json
{
  "name": "My Extension",
  "version": "1.0",
  "description": "This is example Extension",
  "permissions": [ "declarativeContent"],
  "content_security_policy": "default-src 'self'",
      "background": {
    "scripts": ["background.js"],
    "persistent": false
  },
"content_scripts": [
    {
      "matches": ["https://*/*"],
      "js": ["contents.js"]
    }
  ],
  "page_action": {
        "default_popup": "popup.html"
      },
  "manifest_version": 2
}
```

Now button tag and javascript is added into popup.html. 
```html
  <!DOCTYPE html>
  <html>
    <head>
    </head>
    <body>
      <button id ="button">Button</button>
    </body>
  </html>
```

Now button is showed when clicking exetensions plugin button on chrome browser. It looks like this

![popup HTML button](https://dev-to-uploads.s3.amazonaws.com/i/ucb8ya2yrj7cxhm9904t.png)

Now to send message contents.js, javascript file should be added to popup.html. First add script tag on html file.

<script src="popup.js"></script>

```html
  <!DOCTYPE html>
  <html>
    <head>
    </head>
    <body>
      <button id ="button">Button</button>
      <script src="popup.js"></script>
    </body>
  </html>
```


Make popup.js file into extensions folder and add an event to make button tag activate.

```js
document.getElementById('button').addEventListener('click', () => {

})
```

Which means a tag called its id 'button' activate function when clicked.

Put runtime.sendMessage into button event to send messages.

popup.js should look like this

```js
document.getElementById('button').addEventListener('click', () => {

chrome.runtime.sendMessage(undefined,
    "sent message from popup."
);

});
```

Now after out of exetensions page, click button after clicking exetensions plugin and check the background console.
```js
//background.js:19 hello
//background.js:16 get message : sent message.
//background.js:16 get message : sent message from popup.
```

## Sending message from popup to content
Sending message to browser is also possible. By clicking button at popup.html message is sent by accessing tabs. activeTab is used to access tabs to console messages on the browser. So activeTab should be listed on manifest.json.

### What is activeTab?
With activeTab, executing js or CSS file, sending message or intercepting web request are possible by accessing tabs on a browser from background js file or popup js file. If there is eventListners then activeTab can be expired with event. 

```json
{ "permissions": ["activeTab"]
}
```

Now manifest.json should look like

```json
{
  "name": "My Extension",
  "version": "1.0",
  "description": "This is example Extension",
  "permissions": [ "declarativeContent", "activeTab"],
  "content_security_policy": "default-src 'self'",
      "background": {
    "scripts": ["background.js"],
    "persistent": false
  },
"content_scripts": [
    {
      "matches": ["https://*/*"],
      "js": ["contents.js"]
    }
  ],
  "page_action": {
        "default_popup": "popup.html"
      },
  "manifest_version": 2
}
```

Now make other button called button2 on popup.html

```html
<!DOCTYPE html>
  <html>
    <head>
    </head>
    <body>
      <button id ="button">Button</button>
      <button id ="button2">Button2</button>
      <script src="popup.js"></script>
    </body>
  </html>
```

Now add eventListener into popup.js file

```js
document.getElementById('button2').addEventListener('click', () => {

        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.tabs.sendMessage(
            tabs[0].id,
            "This is message from popup"
          );
    });
    
    });
```
popup.js file is executed in popup.html which would be called other browser, so to send message, activeTab should make popup.html access tabs to execute function.

Now at any webpage without chrome://exetensions clicking button2 after clicking exetensions plugin shows log on the browser.
```js
//This is message from popup
```

## Closing
By sending messages on exetensions to browser or background, javascript or adding CSS could be executed. It could multiply user's exeperience on certain url by adding CSS. By intercepting request on background it could communicate to certain webserver so it would give service to users by using user's information from the webserver. But hacking user's information could be abusing to edit html tags in the browser to steal users information. That's why listing on manifest.json is needed. Personally some skills using javascript would be known to javascript users.
![mouse pointer](https://dev-to-uploads.s3.amazonaws.com/i/pt52sgxgkahu4987xbkz.gif)
