
var contextMenus = {};

contextMenus.WebPage = chrome.contextMenus.create(
  { "title": "Web Page", "type": "normal", contexts: ["all"] });

contextMenus.Accessibility = chrome.contextMenus.create(
  { "title": "Accessibility", "type": "normal", contexts: ["all"], "parentId": contextMenus.WebPage });
contextMenus.AccessibilityAltReplace = chrome.contextMenus.create(
  { "title": "Remove Images Without Alt Tags", "type": "normal", contexts: ["all"], "parentId": contextMenus.Accessibility });
contextMenus.AccessibilityRemoveInputsNoLabel = chrome.contextMenus.create(
  { "title": "Remove Inputs Without Labels", "type": "normal", contexts: ["all"], "parentId": contextMenus.Accessibility });
  contextMenus.AccessibilityPageFlow = chrome.contextMenus.create(
    { "title": "Visualise Tab Flow", "type": "normal", contexts: ["all"], "parentId": contextMenus.Accessibility });

contextMenus.Validation = chrome.contextMenus.create(
  { "title": "Validation", "type": "normal", contexts: ["all"], "parentId": contextMenus.WebPage });
contextMenus.ValidationRemoveMaxLength = chrome.contextMenus.create(
  { "title": "Remove Max Length Attributes", "type": "normal", contexts: ["all"], "parentId": contextMenus.Validation });
contextMenus.ValidationRemoveRequired = chrome.contextMenus.create(
  { "title": "Remove Required Field Attributes", "type": "normal", contexts: ["all"], "parentId": contextMenus.Validation });
contextMenus.ValidationRemovePasteRestriction = chrome.contextMenus.create(
  { "title": "Remove Paste Restrictions", "type": "normal", contexts: ["all"], "parentId": contextMenus.Validation });

chrome.contextMenus.onClicked.addListener(contextMenuClickHandler);

function contextMenuClickHandler(info, tab) {

  // TODO: configure everything in here to avoid creating menus above, have something parse array to create menus
  var menuActions = [
    { id: contextMenus.AccessibilityAltReplace, file: "js/web/accessibility/removeImagesWithoutAltTags.js", instant: false },
    { id: contextMenus.AccessibilityPageFlow, file: "js/web/accessibility/visualiseTabFlow.js", instant: false },
    { id: contextMenus.AccessibilityRemoveInputsNoLabel, file: "js/web/accessibility/removeInputsWithoutLabel.js", instant: false },
    { id: contextMenus.ValidationRemoveMaxLength, file: "js/web/validation/removeMaxLength.js", instant: false },
    { id: contextMenus.ValidationRemoveRequired, file: "js/web/validation/removeRequired.js", instant: false },
    { id: contextMenus.ValidationRemovePasteRestriction, file: "js/web/validation/removePasteRestrictions.js", instant: false },
  ];

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