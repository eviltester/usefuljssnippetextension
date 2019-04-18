// configure menus here to avoid writing menu creation code,
// background.js will parse this to create the actual menus
var menuActions = [
// parent menu items need to have a unique menuref, which is used by other items as the 'menu:' property
// currently parents need to be defined first in the array
    { menu: "", "title": "Web Page", menuref: "W", file: ""},
        { menu: "W", "title": "Accessibility", menuref: "W>A", file: ""},    
            { menu: "W>A", "title": "Remove Images Without Alt Tags", file: "js/web/accessibility/removeImagesWithoutAltTags.js", instant: false },
            { menu: "W>A", "title": "Show Images Without Alt Tags", file: "js/web/accessibility/highlightImagesWithoutAltTags.js", instant: false },            
            { menu: "W>A", "title": "Remove Inputs Without Labels", file: "js/web/accessibility/removeInputsWithoutLabel.js", instant: false },            
            { menu: "W>A", "title": "Show Inputs Without Labels", file: "js/web/accessibility/highlightInputsWithoutLabel.js", instant: false },
            { menu: "W>A", "title": "Remove Style Sheets", file: "js/web/accessibility/removeStyleSheets.js", instant: false },
            { menu: "W>A", "title": "Visualise Tab Flow", file: "js/web/accessibility/visualiseTabFlow.js", instant: false },
        { menu: "W", "title": "Validation", menuref: "W>V", file: ""},
            { menu: "W>V", "title": "Remove Max Length Attributes", file: "js/web/validation/removeMaxLength.js", instant: false },
            { menu: "W>V", "title": "Remove Required Field Attributes", file: "js/web/validation/removeRequired.js", instant: false },
            { menu: "W>V", "title": "Remove Paste Restrictions", file: "js/web/validation/removePasteRestrictions.js", instant: false },
        { menu: "W", "title": "Layout", menuref: "W>L", file: ""},
            { menu: "W>L", "title": "Check label text overflow", file: "js/web/layout/increaseLabelsText.js", instant: false },
            { menu: "W>L", "title": "Check button text overflow", file: "js/web/layout/increaseButtonsText.js", instant: false },
            { menu: "W>L", "title": "Check link text overflow", file: "js/web/layout/increaseLinksText.js", instant: false },
            { menu: "W>L", "title": "Check page text overflow", file: "js/web/layout/increasePagesText.js", instant: false },
            { menu: "W>L", "title": "Check all elements text overflow", file: "js/web/layout/increaseAllElementsText.js", instant: false },
];