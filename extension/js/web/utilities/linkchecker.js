var links = document.querySelectorAll("a");
var linkReport = [];
var linksChecked=0;
links.forEach(function(link){
    var http = new XMLHttpRequest();
    var reportLine = {url: link.getAttribute('href'), status:0, message : ""};

    http.open('HEAD', reportLine.url);
    linkReport.push(reportLine);

    http.onreadystatechange = (function(line,xhttp) {
        return function(){
            if (xhttp.readyState == xhttp.DONE) {
                line.status = xhttp.status;
                linksChecked++;
                line.message = xhttp.responseText + xhttp.statusText;
            }
        }
    })(reportLine, http);
    http.send();
});
var finishReport = setInterval(function(){if(linksChecked>=linkReport.length){console.table(linkReport);clearInterval(finishReport)}}, 3000);
