let labels = document.querySelectorAll('label');
for(let i=0; i<labels.length; i++)
{
    let random = Math.random().toString(18).substring(7);

    labels[i].innerHTML = labels[i].innerHTML + random;
}