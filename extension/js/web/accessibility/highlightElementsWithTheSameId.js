
var ids = {};
var all = document.all || document.getElementsByTagName("*");
for (var i = 0, l = all.length; i < l; i++) {
    var id = all[i].id;
    if (id) {
        if (ids[id]) {
            all[i].style = all[i].style+"; border:10px dashed red;"
            document.getElementById(id).style = document.getElementById(id).style+"; border:10px dashed red;"
        } else {
            ids[id] = 1;
        }
    }
};