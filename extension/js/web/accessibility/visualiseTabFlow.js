// Get all inputs, buttons, links
var inputs = Array.apply(null, document.querySelectorAll("input, select, button, a")).filter(elem => elem.getBoundingClientRect().left != 0)

// Go through each input and get top/left
for (I = 0; I < inputs.length; I++) {
  var currentInput = inputs[I].getBoundingClientRect();
  var nextInput = null;

  if (I < inputs.length - 1) {
    nextInput = inputs[I + 1].getBoundingClientRect();
  } else {
    lastInput = inputs[I];
    nextInput = currentInput
  }
  
  // make line draw from middle of control instead of left handside of it
  var currentInputLeft = currentInput.left + (currentInput.width / 2) ;
  var currentInputTop = currentInput.top + (currentInput.height / 2);
  var nextInputLeft = nextInput.left + (nextInput.width / 2) ;
  var nextInputTop = nextInput.top + (nextInput.height / 2);
  
  // Draw a path from current input to next one using top/eft for elements
  // for first element we draw from top left to element
  if(I == 0) {
  	 document.body.insertAdjacentHTML('afterbegin', '<svg style="position:absolute;z-index:5555;height:100%;width:100%;" ><line x1="0" y1="0" x2="' + currentInputLeft + '" y2="' + currentInputTop + '" style="stroke:rgb(255,0,0);stroke-width:3" /><circle cx="' + currentInputLeft  +'" cy="' + currentInputTop  +'" r="3" stroke="red"/></svg>');
  } 
  document.body.insertAdjacentHTML('afterbegin', '<svg style="position:absolute;z-index:5555;height:100%;width:100%;" ><line x1="' + currentInputLeft + '" y1="' + currentInputTop + '" x2="' + nextInputLeft + '" y2="' + nextInputTop + '" style="stroke:rgb(255,0,0);stroke-width:3" /><circle cx="' + nextInputLeft  +'" cy="' + nextInputTop  +'" r="3" stroke="red"/></svg>');

}