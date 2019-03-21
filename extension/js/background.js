//
// Setup the context menu
//
  var contextMenus = {};

  // the menuActions are defined in menu.js

  function findMenuRefItem(theMenuArray, theMenuRef){
    for (var menuindex = 0; menuindex < theMenuArray.length; menuindex++) {
      if(theMenuArray[menuindex].menuref === theMenuRef){
        return theMenuArray[menuindex].id;
      }
    }
  }

  for (var actionindex = 0; actionindex < menuActions.length; actionindex++) {
    if(menuActions[actionindex].menu===""){
      // it is a root level menu, add it to the contextMenus
      menuActions[actionindex].id = chrome.contextMenus.create({ "title": menuActions[actionindex].title, "type": "normal", contexts: ["all"] });
    }else{
      // it is a child menu, find the parent and add it
      var parentId = findMenuRefItem(menuActions, menuActions[actionindex].menu);
      menuActions[actionindex].id = chrome.contextMenus.create({ "title": menuActions[actionindex].title, "type": "normal", contexts: ["all"], "parentId": parentId });
    }
  }

  chrome.contextMenus.onClicked.addListener(contextMenuClickHandler);


 //
 // Handle a menu click
 // 
function contextMenuClickHandler(info, tab) {

  var actionToDo;

  // find the menuAction item for the menu clicked
  for (var actionindex = 0; actionindex < menuActions.length; actionindex++) {
    if (menuActions[actionindex].id === info.menuItemId) {
      actionToDo = menuActions[actionindex];
      break;
    }
  }

  if(!actionToDo){
    // could not find a menu action
    return;
  }

  if(actionToDo.file===""){
    // no file associated with action
    return;
  }

  var errorHandler = function () {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError.message);
    }
  };

  // file reading is async https://stackoverflow.com/questions/4100927/chrome-filereader
  function sendFileContentsAsMessage(filecontents) {
    chrome.tabs.sendMessage(tab.id, { type: "display", messageContents: "Script to Run:\n" });
    chrome.tabs.sendMessage(tab.id, { type: "display", messageContents: filecontents });
  }

  function sendFileContentsAsBookmarklet(filecontents) {
    var bookmarklet = "javascript:(function(){" + encodeURI(filecontents) + "})()";
    chrome.tabs.sendMessage(tab.id, { type: "display", messageContents: "As Bookmarklet:\n" });
    chrome.tabs.sendMessage(tab.id, { type: "display", messageContents: bookmarklet });
  }


  // Execute the Action
  // cannot just execute script if the bot wants to access local variables
  // https://stackoverflow.com/questions/16784553/chrome-extension-throws-not-defined-on-defined-variable
  if (actionToDo.instant) {
    chrome.tabs.executeScript(null, { file: actionToDo.file }, errorHandler);
  } else {
      // inject execution script
      chrome.tabs.executeScript(tab.id, { file: 'js/contentscript.js' }, function () {
      // execute the snippet code by sending a message
      chrome.tabs.sendMessage(tab.id, { type: "execfile", filename: actionToDo.file });
    });
  }

  // Display the code for the action in the console
  getFileContents(actionToDo.file, errorHandler, sendFileContentsAsMessage);
  getFileContents(actionToDo.file, errorHandler, sendFileContentsAsBookmarklet);
  

  // read a file https://stackoverflow.com/questions/28858027/how-to-read-file-from-chrome-extension
  function getFileContents(filename, errorHandler, callback) {
    chrome.runtime.getPackageDirectoryEntry(function (root) {
      root.getFile(filename, {}, function (fileEntry) {
        fileEntry.file(function (file) {
          var reader = new FileReader();
          reader.onloadend = function (e) {
            // contents are in .result
            callback(this.result);
          };
          reader.readAsText(file);
        }, errorHandler);
      }, errorHandler);
    });
  }
}