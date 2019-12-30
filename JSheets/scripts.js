var rows = 0;
var cols = 0;
var letter = 65;
var t = [];
var selected = "";
class Cell {
	constructor(id) {
		this.id = id;
		this.value = "";
		this.color = "black";
		this.backgroundColor = "gray";
	}
}
window.onload = function() {
	var table = document.getElementById("table");
	for(var i = 1; i<=5; i++) {
		var tr = document.createElement("tr");
		for(var j = 0; j<5; j++) {
			var td = document.createElement("td");
			td.setAttribute("id",String.fromCharCode(letter+j)+(rows+1));
			td.setAttribute("onclick","focusize(this.id)");
			t[td.id] = new Cell(td.id);
			td.style.backgroundColor = t[td.id].backgroundColor;
			td.style.color = t[td.id].color;
			td.innerHTML = t[td.id].value;
			tr.appendChild(td);
		}
		rows++;
		cols++;
		table.appendChild(tr);
	}
	//Sets up 5x5 Grid
}
function focusize(given) {
	selected = given;
	document.getElementById("typer").value = t[given].value;
	document.getElementById("typer").focus();
}
function submitVal() {
	t[selected].value = document.getElementById("typer").value;
	document.getElementById(selected).innerHTML = t[selected].value;
	document.getElementById("typer").value = "";
	selected = "";
}