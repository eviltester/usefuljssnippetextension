let elements = document.querySelectorAll("input, select");
for (let i = 0; i < elements.length; i++) {
	elements[i].removeAttribute("required");
}