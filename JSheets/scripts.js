var rows = 0;
var cols = 0;
var letter = 65;
var t = [];
var selected = "a";
class Cell {
	constructor(id) {
		this.id = id;
		this.value = "";
		this.color = "#ffffff";
		this.backgroundColor = "#555555";
		this.textAlign = "left";
	}
}
t["a"] = new Cell("a");
window.onload = function() {
	var table = document.getElementById("table");
	var ttt = document.createElement("tr");
	var th = document.createElement("th");
	ttt.appendChild(th);
	for(var i = 0; i<5; i++) {
		th = document.createElement("th");
		th.innerHTML = String.fromCharCode(letter+i);
		ttt.appendChild(th);
	}
	table.appendChild(ttt);
	
	for(var i = 1; i<=5; i++) {
		var tr = document.createElement("tr");
		th = document.createElement("th");
		th.innerHTML = i;
		tr.appendChild(th);
		for(var j = 0; j<5; j++) {
			var td = document.createElement("td");
			td.setAttribute("id",String.fromCharCode(letter+j)+(rows+1));
			td.setAttribute("onclick","focusize(this.id)");
			t[td.id] = new Cell(td.id);
			td.style.backgroundColor = t[td.id].backgroundColor;
			td.style.color = t[td.id].color;
			td.style.textAlign = t[td.id].textAlign;
			td.innerHTML = t[td.id].value;
			tr.appendChild(td);
		}
		rows++;
		cols++;
		table.appendChild(tr);
	}
	//Sets up 5x5 Grid
}
function saveDownload() {
	var tl = 64;
	var ff = "\u0192\n";
	var text = rows + ff + cols + ff;
	for(var i = 1; i<=rows; i++) {
		for(var j = 1; j<=cols; j++) {
			var id = String.fromCharCode(tl+j)+i;
			text += t[id].value + ff;
			text += t[id].color + ff;
			text += t[id].backgroundColor + ff;
			text += t[id].textAlign + ff;
		}
	}
	text = text.substring(0,text.length);
	var element = document.createElement('a');
	
    element.setAttribute('href', 'data:text/bob;charset=utf-16,' + encodeURIComponent(text));
	element.setAttribute('download', "JSheetFile.bob");
	element.setAttribute("target","_blank");
	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
}
function load(event) {
	var reader = new FileReader();
	var file = event.target.files[0];
	var con = "";
	reader.onload = function(event) {
		con = event.target.result;
		con = con.split("\u0192\n");
		rows = con[0];
		cols = con[1];
		var counter = 2;
		t = [];
		t["a"] = new Cell("a");
		var table = document.getElementById("table");
		while (table.firstChild) {
			table.removeChild(table.firstChild);
		}
		
		var ttt = document.createElement("tr");
		var th = document.createElement("th");
		ttt.appendChild(th);
		for(var i = 0; i<cols; i++) {
			th = document.createElement("th");
			th.innerHTML = String.fromCharCode(letter+i);
			ttt.appendChild(th);
		}
		table.appendChild(ttt);
		
		for(var i = 0; i<rows; i++) {
			var tr = document.createElement("tr");
			th = document.createElement("th");
			th.innerHTML = i+1;
			tr.appendChild(th);
			
			for(var j = 0; j<cols; j++) {
				var td = document.createElement("td");
				td.setAttribute("id",String.fromCharCode(letter+j)+(i+1));
				td.setAttribute("onclick","focusize(this.id)");
				t[td.id] = new Cell(td.id);
				td.innerHTML = con[counter++];
				t[td.id].value = td.innerHTML;
				
				td.style.color = con[counter++];
				t[td.id].color = td.style.color;
				
				td.style.backgroundColor = con[counter++];
				t[td.id].backgroundColor = td.style.backgroundColor;
				
				td.style.textAlign = con[counter++];
				t[td.id].textAlign = td.style.textAlign;
				tr.appendChild(td);
			}
			table.appendChild(tr);
		}
	}
	reader.readAsText(file);
}
function focusize(given) {
	selected = given;
	document.getElementById("typer").value = t[given].value;
	document.getElementById("colorSelector").value = t[selected].color;
	document.getElementById("bcSelector").value = t[selected].backgroundColor;
	document.getElementById("typer").focus();
	document.getElementById("typer").select();
}
function submitVal() {
	t[selected].value = document.getElementById("typer").value;
	document.getElementById(selected).innerHTML = t[selected].value;
	document.getElementById("typer").value = "";
	selected = "a";
}
function cChange() {
	t[selected].color = document.getElementById("colorSelector").value;
	document.getElementById(selected).style.color = t[selected].color;
}
function bcChange() {
	t[selected].backgroundColor = document.getElementById("bcSelector").value;
	document.getElementById(selected).style.backgroundColor = t[selected].backgroundColor;
}
function changeAlign(ta) {
	t[selected].textAlign = ta;
	document.getElementById(selected).style.textAlign = t[selected].textAlign;
}
function addRow() {
	var table = document.getElementById("table");
	var ttt = document.createElement("tr");
	var th = document.createElement("th");
	th.innerHTML = table.childElementCount;
	ttt.appendChild(th);
	table.appendChild(ttt);
	rows++;
	
	for(var i = 0; i<cols; i++) {
		var td = document.createElement("td");
		td.setAttribute("id",String.fromCharCode(letter+i)+th.innerHTML);
		td.setAttribute("onclick","focusize(this.id)");
		t[td.id] = new Cell(td.id);
		td.style.backgroundColor = t[td.id].backgroundColor;
		td.style.color = t[td.id].color;
		td.style.textAlign = t[td.id].textAlign;
		td.innerHTML = t[td.id].value;
		ttt.appendChild(td);
	}
}
function addCol() {
	cols++;
	var table = document.getElementById("table");
	var th = document.createElement("th");
	th.innerHTML = String.fromCharCode(letter+cols-1);
	table.children[0].appendChild(th);
	
	for(var i = 0; i<rows; i++) {
		var td = document.createElement("td");
		td.setAttribute("id",th.innerHTML+(i+1));
		td.setAttribute("onclick","focusize(this.id)");
		t[td.id] = new Cell(td.id);
		td.style.backgroundColor = t[td.id].backgroundColor;
		td.style.color = t[td.id].color;
		td.style.textAlign = t[td.id].textAlign;
		td.innerHTML = t[td.id].value;
		table.children[i+1].appendChild(td);
	}
}