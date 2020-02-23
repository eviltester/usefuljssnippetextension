
var ids = {};
var all = document.all || document.getElementsByTagName("*");
for (var i = 0, l = all.length; i < l; i++) {
    var id = all[i].id;
    if (id) {
        if (ids[id]) {
            all[i].style.display = 'none';
            document.getElementById(id).style.display = 'none';
        } else {
            ids[id] = 1;
        }
    }
};