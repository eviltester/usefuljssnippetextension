var inputs = document.querySelectorAll('input');
var labels = document.querySelectorAll('label');

for (var currentInput = 0; currentInput < inputs.length; currentInput++) {
    var inputHasLabel = false;
    for (var currentLabel = 0; currentLabel < labels.length; currentLabel++) {
        if (labels[currentLabel].htmlFor == inputs[currentInput].id) {
            inputHasLabel = true;
        }
    }
    if (inputHasLabel == false) {
        inputs[currentInput].style = inputs[currentInput].style+"; border:10px dashed red;";
    }
}