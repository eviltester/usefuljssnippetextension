let pageStyleSheets = document.styleSheets;
for(let i=0; i<pageStyleSheets.length; i++)
{
	document.styleSheets[i].disabled = true;
}