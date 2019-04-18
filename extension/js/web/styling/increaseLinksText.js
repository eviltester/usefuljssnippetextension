let links = document.querySelectorAll('a');
for(let i=0; i<links.length; i++)
{
    let random = Math.random().toString(18).substring(7);

    links[i].innerHTML = links[i].innerHTML + random;
}