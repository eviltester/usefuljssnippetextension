# Useful Snippets Extension

A Chrome Extension with Useful JavaScript snippets for testing

Feel free to contribute to this set of snippets.

What we are looking for are short JavaScript snippets that can run from a popup menu and provide small useful aids to support testing.

And are also small enough that the provide useful examples of using JavaScript from the console or as Bookmarklets and help people learn to use JavaScript in their testing.

## Basic Install Instructions

- Download and extract this repository somewhere
- Navigate to `chrome://extensions` within Chrome
- Ensure to switch 'Developer mode' on (a toggle at the top right of the page)
- Select 'Load unpacked' and then navigate to the  `/extension` folder
- Navigate to a website and then right click it to access the `Web Page` context menu
- After executing a snippet you can see the bot code and get the code as a bookmarklet by viewing the DevTools console 

![how to install extension](https://github.com/eviltester/usefuljssnippetextension/blob/master/Images/HowToInstall.gif)

## Current Snippets
Below is a list of snippets currently available with this extension. Have an idea? Want to contribute? Please feel free to fork this repository, add snippets and then create a pull request.

### Accessibility
* Remove images which do not have alt tags
* Remove inputs which do not have matching `for` labels
* Remove page style sheets
* Visualise page tab flow

### Validation (Client side)
* Remove max length attributes from fields
* Remove require field attributes from fields
* Remove paste restrictions from fields

## Contributors

See commit history for the authorship of the onging snippets.

- [Alan Richardson](https://github.com/eviltester) created the basic framework for the Chrome Extension as well as the remove paste restriction snippet.
    - [eviltester.com](https://eviltester.com)
    - [@eviltester](https://twitter.com/eviltester)
    - [linkedin.com/in/eviltester](https://www.linkedin.com/in/eviltester)
- [Viv Richards](https://github.com/vivrichards600) contributed the first JavaScript snippets to this extension: visualise tab flow, remove inputs, remove images, remove max length, remove required, remove style sheets.
    - [vivrichards.co.uk](http://vivrichards.co.uk/)
    - [@11vlr](https://twitter.com/11vlr)
    - [linkedin.com/in/vivrichards](https://www.linkedin.com/in/vivrichards)


## TODO

- add an icon
- add more snippets
