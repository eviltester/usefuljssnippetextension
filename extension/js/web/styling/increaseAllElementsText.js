let elements = document.querySelectorAll('label, button, a, h1, h2, h3, h4, h5, p, input, select');
for(let i=0; i<elements.length; i++)
{
    let random = Math.random().toString(18).substring(7);

    elements[i].innerHTML = elements[i].innerHTML + random;
}