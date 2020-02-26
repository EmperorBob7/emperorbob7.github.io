import Character from "/exports/character.js";
var ctx, canvas, player;
//Set up variables
window.onload = function() {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	
	if (localStorage.getItem("created") === null) {
		createCharacter();
	} else {
		loadMenu();
	}
}
//Character Creation
function createCharacter() {
	
}