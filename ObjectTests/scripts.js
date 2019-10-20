class Cell {
	constructor() {
		this.value = "";
		this.background = "white";
	}
	setBackColor(colorr) {
		this.background = colorr;
	}
}
var arrInArr = [
	[new Cell()]
];
window.onload = function() {
	drawCells();
}
function addColumn(amount) {
	for(var i = 0; i<arrInArr.length; i++) {
		arrInArr[i].push(new Cell());
	}
	drawCells();
}
function addRows(amount) {
	var temp = [];
	for(var i = 0; i<arrInArr[0].length; i++) {
		temp.push(new Cell());
	}
	arrInArr.push(temp);
	console.log(arrInArr.length);
	drawCells();
}
function drawCells() {
	var spread = document.getElementById("spreadsheet");
	while (spread.firstChild) {
		spread.removeChild(spread.firstChild);
	}
	
	
	for(var i = 0; i<arrInArr.length; i++) {
		var row = document.createElement("TR");
		spread.appendChild(row);
		for(var j = 0; j<arrInArr[i].length; j++) {
			var td = document.createElement("TD");
			var inp = document.createElement("INPUT");
			inp.value = arrInArr[i][j].value;
			inp.style.backgroundColor = arrInArr[i][j].background;
			row.appendChild(td);
			td.appendChild(inp);
		}
	}
}
function setBackgroundColor() {
	var row = parseInt(document.getElementById("row").value)-1;
	var col = parseInt(document.getElementById("col").value)-1;
	if(row == null) {
		row = 0;
	}
	if(col == null) {
		col = 0;
	}
	var color = document.getElementById("color").value;
	arrInArr[row][col].setBackColor(color);
	drawCells();
}