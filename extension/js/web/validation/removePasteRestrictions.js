var inputs = document.querySelectorAll('input');
for (let i = 0; i < inputs.length; i++) {
    if(typeof inputs[i].onpaste === 'function'){
        inputs[i].onpaste= new function(){};
    }
}