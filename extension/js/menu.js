// configure menus here to avoid writing menu creation code,
// background.js will parse this to create the actual menus
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