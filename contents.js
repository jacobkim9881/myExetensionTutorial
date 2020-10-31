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

chrome.runtime.onMessage.addListener((msg) => {
console.log(msg)
});