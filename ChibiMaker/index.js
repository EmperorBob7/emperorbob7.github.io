const canvas = new fabric.Canvas("canvas");
let chibiImage;
canvas.selection = false;

window.onload = function() {
    fabric.Image.fromURL('./background.png', function(oImg) {
        oImg.selectable = false;
        canvas.add(oImg);
        loadText();
    });
}

document.getElementById("customChibi").onchange = function(e) {
    canvas.remove(chibiImage);
    let img = new Image();
    img.onload = function() {
        loadChibi(img.src);
    };
    img.src = URL.createObjectURL(this.files[0]);
}

function loadChibi(src) {
    fabric.Image.fromURL(src, function(oImg) {
        oImg.selectable = false;
        oImg.left = 39;
        oImg.top = 5;
        oImg.scaleToWidth(122);
        oImg.scaleToHeight(274);
        chibiImage = oImg;
        canvas.add(oImg);
        canvas.renderAll();
    });
}

function loadText() {
    canvas.add(new fabric.Textbox("Character Description goes here", {
        left: 198,
        top: 89,
        width: 353,
        height: 149,
        fontFamily: "Arial",
        fontSize: 14,
        hasControls: false,
        lockMovementX: true,
        lockMovementY: true,
        lockScalingX: true,
        lockScalingY: true
    }));
    canvas.add(new fabric.Textbox("Name", {
        left: 198,
        top: 2,
        width: 380,
        height: 33,
        fontFamily: "Domyouji",
        fontSize: 38,
        hasControls: false,
        lockMovementX: true,
        lockMovementY: true,
        lockScalingX: true,
        lockScalingY: true,
        strokeWidth: 1,
        stroke: "white"
    }));
    canvas.add(new fabric.Textbox("Short Text", {
        left: 198,
        top: 43,
        width: 380,
        height: 20,
        fontFamily: "Domyouji",
        fontSize: 20,
        hasControls: false,
        lockMovementX: true,
        lockMovementY: true,
        lockScalingX: true,
        lockScalingY: true,
        fill: "white",
        strokeWidth: 1.5,
        stroke: "black"
    }));
}

function render() {
    canvas.remove(chibiImage);
    loadChibi(getCheckedRadioValue("chibi"));
}

function getCheckedRadioValue(name) {
    var elements = document.getElementsByName(name);

    for (var i = 0, len = elements.length; i < len; ++i)
        if (elements[i].checked) return elements[i].value;
}

function downloadImage(el) {
    var image = canvas.toDataURL("image/jpg");
    el.href = image;
}