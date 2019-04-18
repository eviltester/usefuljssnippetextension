let buttons = document.querySelectorAll('button');
for(let i=0; i<buttons.length; i++)
{
    let random = Math.random().toString(18).substring(7);

    buttons[i].innerHTML = buttons[i].innerHTML + random;
}