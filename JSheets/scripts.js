var rows = 0;
var cols = 0;
var letter = 65;
var t = [];
var selected = "a";
//Object for every cell
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
	//Create the initial Table heads
	for(var i = 0; i<26; i++) {
		th = document.createElement("th");
		th.innerHTML = String.fromCharCode(letter+i);
		ttt.appendChild(th);
	}
	table.appendChild(ttt);
	
	for(var i = 1; i<=26; i++) {
		//Create each row head
		var tr = document.createElement("tr");
		th = document.createElement("th");
		th.innerHTML = i;
		tr.appendChild(th);
		for(var j = 0; j<26; j++) {
			//Create each cell
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
	//Sets up 26x26 Grid
}
//Detects key inputs so you don't have to press the submit button and can just press enter on your keyboard
var keys = [];
function detectEnter(e) {
	keys[e.key] = true;
	if(keys["Enter"] && !keys["Shift"]) {
		keys["Enter"] = false;
		submitVal();
	}
}
//Release Keys
function releaseKey(e) {
	keys[e.key] = false;
}
//Save Function
function saveDownload() {
	var tl = 64;
	var ff = "\u0192\\";
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
	if(document.getElementById("fileName").value == "")
		document.getElementById("fileName").value = "JSheet File";
	element.setAttribute('download', document.getElementById("fileName").value + ".bob");
	element.setAttribute("target","_blank");
	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
	closeWindow();
}
function saveWindow() {
	document.getElementById("popUp").style.display = "block";
}
function closeWindow() {
	document.getElementById("popUp").style.display = "none";
}
//Load Function
function load(event) {
	var reader = new FileReader();
	var file = event.target.files[0];
	var con = "";
	//Start reading the inputted file
	reader.onload = function(event) {
		var fileN = document.getElementById("loadButton").files[0].name;
		document.getElementById("fileName").value = fileN.substring(0,fileN.length-4);
		con = event.target.result;
		con = con.split("\u0192\\");
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
				
				t[td.id].color = con[counter++];
				td.style.color = t[td.id].color;
				
				t[td.id].backgroundColor = con[counter++];
				td.style.backgroundColor = t[td.id].backgroundColor;
				
				td.style.textAlign = con[counter++];
				t[td.id].textAlign = td.style.textAlign;
				tr.appendChild(td);
			}
			table.appendChild(tr);
		}
		updateAll();
		focusize("A1");
	}
	reader.readAsText(file);
}
//Select the input enter box and bring up the content of the cell
function focusize(given) {
	selected = given;
	document.getElementById("typer").disabled = false;
	document.getElementById("selectedCell").innerHTML = selected;
	document.getElementById("typer").value = t[given].value;
	document.getElementById("colorSelector").value = t[selected].color;
	document.getElementById("bcSelector").value = t[selected].backgroundColor;
	document.getElementById("typer").focus();
	document.getElementById("typer").select();
}
//Make the value of the cell updated
function submitVal() {
	t[selected].value = document.getElementById("typer").value;
	document.getElementById(selected).innerHTML = t[selected].value;
	document.getElementById("typer").value = "";
	if(t[selected].value.charAt(0) == '=' && t[selected].value.length > 2) {
		functionality();
	}
	updateAll();
	document.getElementById("selectedCell").innerHTML = "";
	document.getElementById("colorSelector").value = "#FFFFFF";
	document.getElementById("bcSelector").value = "#555555";
}
//Updates all cells, might get laggy with big sheets? Useful for function cells
function updateAll() {
	for(var i = 0; i<rows; i++) {
		for(var j = 0; j<cols; j++) {
			var id = String.fromCharCode(letter+j)+(i+1);
			selected = id;
			if(t[selected].value.length > 1 && t[selected].value.charAt(0) == '=') {
				functionality();
			}
		}
	}
	selected = "a";
	document.getElementById("typer").disabled = true;
}
//Regex stuff that I made to much more easily run the User's cell functions although it for sure isn't a perfect system
function functionality() {
	var text = t[selected].value.substring(1) + " ";
	const regex = /\w(1[0-9]|2[0-9]|[1-9])/g;
	const regex2 = /\w(1[0-9]|2[0-9]|[1-9])/;
	const regex3 =  /[A-Z](1[0-9]|2[0-9]|[1-9])[^"]/g;
	const regex4 =  /[A-Z](1[0-9]|2[0-9]|[1-9])[^"]/;
	var arr = text.match(regex);
	if(arr !== null) {
		for(var i = 0; i<arr.length; i++) {
			var replacer = t[arr[i].match(regex)].value;
			if(isNaN(replacer))
				replacer = "\""+replacer+"\"";
			arr[i] = arr[i].replace(regex2,replacer);
		}
		var extra = text.match(regex3);
		for(var i = 0; i<arr.length; i++) {
			var temp = extra[i];
			temp = temp.substring(temp.length-1);
			text = text.replace(regex4,arr[i]+temp);
		}
	}
	//console.log(text);
	document.getElementById(selected).innerHTML = eval(text);
}
//Text Color Change Update
function cChange() {
	t[selected].color = document.getElementById("colorSelector").value;
	document.getElementById(selected).style.color = t[selected].color;
}
//Background Color Change Update
function bcChange() {
	t[selected].backgroundColor = document.getElementById("bcSelector").value;
	document.getElementById(selected).style.backgroundColor = t[selected].backgroundColor;
}
//Text Align Change Update
function changeAlign(ta) {
	t[selected].textAlign = ta;
	document.getElementById(selected).style.textAlign = t[selected].textAlign;
}
//Adds a new Row DUH
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
//Adds a new column
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
//User Functions, more information is on the link at the top of the page!
function SUM() {
	var sum = 0;
	for(var i = 0; i<arguments.length; i++) {
		sum += arguments[i];
	}
	return sum;
}
function AVERAGE() {
	var sum = 0;
	for(var i = 0; i<arguments.length; i++) {
		sum += arguments[i];
	}
	return sum/arguments.length;
}
function MAX() {
	var max = parseInt(arguments[0]);
	for(var i = 0; i<arguments.length; i++) {
		if(parseInt(arguments[i]) > max)
			max = arguments[i];
	}
	return max;
}
function MIN() {
	var min = parseInt(arguments[0]);
	for(var i = 0; i<arguments.length; i++) {
		if(parseInt(arguments[i]) < min)
			min = arguments[i];
	}
	return min;
}
function TYPE() {
	const regex = /\.[0-9]/;
	if(arguments[0] == "true" || arguments[0] == "false")
		return "Boolean";
	if(isNaN(arguments[0]))
		return "String";
	else if(!Number.isInteger(arguments[0]))
		return "Decimal";
	else
		return "Integer";
}