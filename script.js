alert("Still in work but its public so you can see my journey on making my new blog :D");
function home() {
    document.getElementById("homebtn").className = "tabactive";
    document.getElementById("contactbtn").className = "";
    document.getElementById("infobtn").className = "";
    document.getElementById("home").style.display = "block";
    document.getElementById("info").style.display = "none";
    document.getElementById("contact").style.display = "none";
}
function contact() {
    document.getElementById("contactbtn").className = "tabactive";
    document.getElementById("homebtn").className = "";
    document.getElementById("infobtn").className = "";
    document.getElementById("home").style.display = "none";
    document.getElementById("info").style.display = "none";
    document.getElementById("contact").style.display = "block";
}
function info() {
    document.getElementById("infobtn").className = "tabactive";
    document.getElementById("homebtn").className = "";
    document.getElementById("contactbtn").className = "";
    document.getElementById("home").style.display = "none";
    document.getElementById("info").style.display = "block";
    document.getElementById("contact").style.display = "none";
}