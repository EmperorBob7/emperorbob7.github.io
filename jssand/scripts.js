var ctx, canvas, interval, speed = 50;
var speedInput;
var grid = [[]];
var down;
var ee;
//Elements
var VOID = 0;
var METAL = 1;
var SAND = 2;
var WATER = 3;
var ICE = 4;
var TREE = 5;
var LEAF = 6;
var WOOD = 7;

var selected = METAL;
var colors = ["black", "gray", "yellow", "blue", "cyan", "#a1784f", "green", "#a1784f"];

//Setup Game when page loads
window.onload = function () {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	grid = new Array(140);
	for (var i = 0; i < grid.length; i++) {
		grid[i] = new Array(200).fill(0);
	}
	canvas.addEventListener("mousedown", mouseDown);
	canvas.addEventListener("mouseup", mouseUp);
	canvas.addEventListener("mousemove", mouseMove);
	speedInput = document.getElementById("speedInput");
	speedInput.addEventListener("change", (e) => {
		speed = speedInput.value;
	});
	update();
}
function update() {
	if (down) {
		clicked(ee);
	}
	//Check Grid
	for (var i = 0; i < speed * 10000; i++) {
		var r = Math.floor(Math.random() * grid.length) * 10 / 10;
		var c = Math.floor(Math.random() * grid[0].length) * 10 / 10;
		if (grid[r][c] == SAND && r < grid.length - 1) {
			if (grid[r + 1][c] == VOID) {
				grid[r][c] = VOID;
				grid[r + 1][c] = SAND;
			}
			if (grid[r + 1][c] == WATER) {
				grid[r][c] = WATER;
				grid[r + 1][c] = SAND;
			}
		}
		else if (grid[r][c] == WATER) {
			var random = Math.floor(Math.random() * 3);
			if (random == 0 && c > 0 && grid[r][c - 1] == VOID) {
				grid[r][c - 1] = WATER;
				grid[r][c] = VOID;
			}
			else if (random == 1 && c < grid[0].length - 1 && grid[r][c + 1] == VOID) {
				grid[r][c + 1] = WATER;
				grid[r][c] = VOID;
			}
			else if (random == 2 && r < grid.length - 1 && grid[r + 1][c] == VOID) {
				grid[r + 1][c] = WATER;
				grid[r][c] = VOID;
			}
		}
		else if (grid[r][c] == ICE) {
			if (r != 0 && grid[r - 1][c] == WATER) {
				grid[r - 1][c] = ICE;
			}
			if (r < grid.length - 1 && grid[r + 1][c] == WATER) {
				grid[r + 1][c] = ICE;
			}
			if (c != 0 && grid[r][c - 1] == WATER) {
				grid[r][c - 1] = ICE;
			}
			if (c < grid[0].length - 1 && grid[r][c + 1] == WATER) {
				grid[r][c + 1] = ICE;
			}
		}
		else if (grid[r][c] == TREE) {
			if (c > 0 && grid[r][c - 1] == VOID) {
				grid[r][c - 1] = TREE;
			}
			else if (c == 0) {
				grid[r][c] = LEAF;
			}
		}
	}
	//Update Visuals
	draw();
	requestAnimationFrame(update);
}
function draw() {
	ctx.fillStyle = colors[0];
	ctx.fillRect(0, 0, grid[0].length * 10, grid.length * 10);
	for (var r = 0; r < grid.length; r++) {
		for (var c = 0; c < grid[0].length; c++) {
			//console.log(grid[r/10][c/10]);
			ctx.fillStyle = colors[grid[r][c]];
			ctx.fillRect(c * 10, r * 10, 10, 10);
		}
	}
}
function clicked(e) {
	var rect = canvas.getBoundingClientRect();
	var x = Math.floor((e.clientX - rect.left) / 10);
	var y = Math.floor((e.clientY - rect.top) / 10);
	for (let r = y - 5; r <= y + 5; r++) {
		for (let c = x - 5; c <= x + 5; c++) {
			if (c >= 0 && c < grid[0].length && r >= 0 && r < grid.length) {
				let t = Math.random();
				if (t < 0.7)
					grid[r][c] = selected;
			}
		}
	}
}
function mouseDown(e) {
	ee = e;
	down = true;
}
function mouseUp(e) {
	down = false;
}
function mouseMove(e) {
	ee = e;
}
function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
		y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
	};
}
function setElement(element) {
	selected = element;
	ctx.fillStyle = colors[element];
}