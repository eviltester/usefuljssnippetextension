let elements = document.querySelectorAll("img");
for (i = 0; i < elements.length; i++) {
  if (elements[i].alt == "") {
    elements[i].src = "Removed"
  }
}