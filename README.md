# ![extension icon](https://github.com/eviltester/usefuljssnippetextension/blob/master/extension/icon48.png) Useful Snippets Extension

A Chrome Extension with Useful JavaScript snippets for testing.

Feel free to contribute to this set of snippets.

What we are looking for are short JavaScript snippets that can run from a popup menu and provide small useful aids to support testing.

The snippets should also be small enough that they provide useful examples of using JavaScript from the console or as Bookmarklets and help people learn to use JavaScript in their testing.

## Basic Install Instructions

- Download and extract this repository somewhere
- Navigate to `chrome://extensions` within Chrome
- Ensure to switch 'Developer mode' on (a toggle at the top right of the page)
- Select 'Load unpacked' and then navigate to the  `/extension` folder
- Navigate to a website and then right click it to access the `Useful Snippets` context menu
- After executing a snippet you can see the bot code and get the code as a bookmarklet by viewing the DevTools console 

![how to install extension](https://github.com/eviltester/usefuljssnippetextension/blob/master/Images/HowToInstall.gif)

## Current Snippets
Below is a list of snippets currently available with this extension. Have an idea? Want to contribute? Please feel free to fork this repository, add snippets and then create a pull request.

### Accessibility
* Remove images which do not have alt tags
* Show images which do not have alt tags
* Remove inputs which do not have matching `for` labels
* Show inputs which do not have matching `for` labels
* Remove page style sheets
* Visualise page tab flow

### Exploits
* Insert JS Script Injection in all inputs
* Insert SQL Injection in all inputs

### Styling
* Check label text overflow
* Check button text overflow
* Check link text overflow
* Check page text overflow
* Check all elements text overflow

### Utilities
* Switch document edit mode on
* Switch document edit mode off
* Pretty print a JSON string
* Encode a string as Base64
* Decode a Base64 string
* For Every _element_ Do _this_
    * will prompt twice, first for a CSS selector, next for some javascript to execute against the _element_ variable.
    * e.g. "p" and then "console.log(element.innerText)" would write out the text of all paragraphs to the console
    * e.g. "[role='checkbox']" and then "element.click()" would toggle all checkboxes

### Validation (Client side)
* Remove max length attributes from fields
* Remove required field attributes from fields
* Remove paste restrictions from fields
* Change all inputs types to text

## Contributors

See commit history for the authorship of the onging snippets.

- [Alan Richardson](https://github.com/eviltester) created the basic framework for the Chrome Extension and contributed JavaScript snippets to this extension.
    - [eviltester.com](https://eviltester.com)
    - [@eviltester](https://twitter.com/eviltester)
    - [linkedin.com/in/eviltester](https://www.linkedin.com/in/eviltester)
- [Viv Richards](https://github.com/vivrichards600) contributed JavaScript snippets to this extension.
    - [vivrichards.co.uk](http://vivrichards.co.uk/)
    - [@11vlr](https://twitter.com/11vlr)
    - [linkedin.com/in/vivrichards](https://www.linkedin.com/in/vivrichards)