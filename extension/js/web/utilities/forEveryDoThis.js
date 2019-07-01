var cssselectorToUse = prompt("Enter a CSS selector to match elements","");
var theCodeToExec = prompt("Enter JavaScript Code to use element","element.style='border:10px dashed red'");
document.querySelectorAll(cssselectorToUse).forEach(function(element){eval(theCodeToExec)});