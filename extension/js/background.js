
var contextMenus = {};

// *
  // * configure menus here to avoid writing menu creation code, have something parse array to create menus
  // *
  var menuActions = [
    // parent menu items need to have a unique menuref, which is used by other items as the 'menu:' property
    // currently parents need to be defined first in the array
    { menu: "", "title": "Web Page", menuref: "W", file: ""},
      { menu: "W", "title": "Accessibility", menuref: "W>A", file: ""},    
        { menu: "W>A", "title": "Remove Images Without Alt Tags", file: "js/web/accessibility/removeImagesWithoutAltTags.js", instant: false },
        { menu: "W>A", "title": "Visualise Tab Flow", file: "js/web/accessibility/visualiseTabFlow.js", instant: false },
        { menu: "W>A", "title": "Remove Inputs Without Labels", file: "js/web/accessibility/removeInputsWithoutLabel.js", instant: false },
      { menu: "W", "title": "Validation", menuref: "W>V", file: ""},
        { menu: "W>V", "title": "Remove Max Length Attributes", file: "js/web/validation/removeMaxLength.js", instant: false },
        { menu: "W>V", "title": "Remove Required Field Attributes", file: "js/web/validation/removeRequired.js", instant: false },
        { menu: "W>V", "title": "Remove Paste Restrictions", file: "js/web/validation/removePasteRestrictions.js", instant: false },
  ];

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

function contextMenuClickHandler(info, tab) {

  var actionToDo;

  for (var actionindex = 0; actionindex < menuActions.length; actionindex++) {
    if (menuActions[actionindex].id === info.menuItemId) {
      actionToDo = menuActions[actionindex];
      break;
    }
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


  // cannot just execute script if the bot wants to access local variables
  // https://stackoverflow.com/questions/16784553/chrome-extension-throws-not-defined-on-defined-variable

  if (actionToDo.instant) {
    chrome.tabs.executeScript(null, { file: actionToDo.file }, errorHandler);
  } else {
    // inject script and send a message to create script tag - not as good though
    chrome.tabs.executeScript(tab.id, { file: 'js/contentscript.js' }, function () {
      // do it
      chrome.tabs.sendMessage(tab.id, { type: "execfile", filename: actionToDo.file });
      // display it
      getFileContents(actionToDo.file, errorHandler, sendFileContentsAsMessage);
      getFileContents(actionToDo.file, errorHandler, sendFileContentsAsBookmarklet);
    });
  }


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