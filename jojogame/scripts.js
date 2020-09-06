var points = 0;
var pointElement;
window.onload = function() {
	pointElement = document.getElementById("points");
}
//If the Image is Clicked
function clicked() {
	points++;
	pointElement.innerHTML = points;
}
//Makes the Clip small on mouse down
function small() {
	document.getElementById("img").style.width = "470px";
	document.getElementById("img").style.height = "470px";
}
//makes the mouse return to normal
function big() {
	document.getElementById("img").style.width = "500px";
	document.getElementById("img").style.height = "500px";
}
//Makes color Nav Appear
function displayColors() {
	document.getElementById("colornav").style.display = "block";
	document.getElementById("upgradenav").style.display = "none";
	document.getElementById("main").style.display = "none";
}
//Makes Upgrades Nav Appear
function displayUpgrades() {
	document.getElementById("colornav").style.display = "none";
	document.getElementById("upgradenav").style.display = "block";
	document.getElementById("main").style.display = "none";
}
//Goes back to home page
function homeShow() {
	document.getElementById("colornav").style.display = "none";
	document.getElementById("upgradenav").style.display = "none";
	document.getElementById("main").style.display = "block";
}
function resetScore() {
	if(confirm("Are you sure you want to reset?")) {
		document.getElementById("ger").style.display = "block";
		var audio = new Audio('return to zero.mp3');
		audio.play();
		points = 0;
		pointElement.innerHTML = points;
		setTimeout(yeet,3350);
	}
}
function yeet() {
	document.getElementById("ger").style.display = "none";
}