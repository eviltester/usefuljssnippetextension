// inject bot script
if(window.haveInstalledBotListener!==true){
    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
        if(message.type==="execfile"){
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = chrome.extension.getURL(message.filename);
            document.getElementsByTagName('head')[0].appendChild(script);
        }
        if(message.type==="display"){
            console.log(message.messageContents)
        }
    });
    window.haveInstalledBotListener=true;
}