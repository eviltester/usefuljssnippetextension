let texts = document.querySelectorAll('h1, h2, h3, h4, h5, p');
for(let i=0; i<texts.length; i++)
{
    let random = Math.random().toString(18).substring(7);

    texts[i].innerHTML = texts[i].innerHTML + random;
}