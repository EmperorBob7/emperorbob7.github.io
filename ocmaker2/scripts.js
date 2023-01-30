"use strict";

/** @type {CanvasRenderingContext2D} */
let ctx;
/** @type {HTMLCanvasElement} */
let canvas;
/** @type {HTMLCanvasElement} */
let visualCanvas;
/** @type {Image} */
let img;

window.onload = () => {
    loadImages();

    canvas = document.createElement("canvas");
    visualCanvas = document.getElementById("canvas").getContext("2d");
    canvas.width = "2610";
    canvas.height = "1205";
    ctx = canvas.getContext("2d");
    img = new Image();
    img.onload = () => {
        reset();
    }
    img.src = "./images/color/baseImage.png";

    writeDatalist();
}

function reset() {
    ctx.clearRect(0, 0, 2610, 1205);
    ctx.drawImage(img, 0, 0);
    drawToReal();
}

async function draw() {
    reset();
    let characterImageUrl = document.getElementById("characterImage").value;
    await drawPFP(characterImageUrl);
    drawName(document.getElementById("characterName").value);
    drawInformation();
    drawStats();
    drawTriggers();
    await drawEmblem();
    ctx.restore();

    drawToReal();
    //saveImage();
}

async function saveImage() {
    let img = new Image();
    img.src = canvas.toDataURL();
    var myWindow = window.open("", "", "width=2610,height=1205");
    myWindow.document.body.appendChild(img);
}

function drawPFP(characterImageUrl) {
    log("");
    return new Promise((res) => {
        let t = new Image();
        t.crossOrigin = "anonymous";
        t.addEventListener("load", () => {
            ctx.save();
            let r = 398.5;
            ctx.beginPath();
            ctx.moveTo(538, 116);
            ctx.arcTo(936, 116, 936, 514, r);
            ctx.arcTo(936, 912, 538, 912, r);
            ctx.arcTo(140, 912, 140, 514, r);
            ctx.arcTo(140, 116, 538, 116, r);
            ctx.clip();
            ctx.drawImage(t, 140, 116, 797, 797);
            ctx.restore();
            res();
        });
        t.addEventListener("error", () => {
            log("Invalid Image URL");
            res();
        });
        t.src = characterImageUrl;
    });
}

function log(x) {
    document.getElementById("console").innerText = x;
}

function drawName(characterName) {
    ctx.font = "75px coda";
    ctx.fillStyle = "#7ADDCD";
    ctx.textAlign = "start";
    ctx.fillText(characterName, 1070, 318);
}

function drawInformation() {
    let verticalOffset = 10;

    let age = document.getElementById("age").value;
    let sex = document.getElementById("sex").value;
    let bday = document.getElementById("bday").value;
    let height = document.getElementById("height").value;
    let weight = document.getElementById("weight").value;
    let blood = document.getElementById("blood").value;
    let zodiac = document.getElementById("zodiac").value;
    let occupation = document.getElementById("occupation").value;
    let likes = document.getElementById("likes").value;


    ctx.font = "30px Arial";
    ctx.fillStyle = "#FFF";
    ctx.fillText("Age: " + age, 1070, 372 + verticalOffset);
    ctx.fillText("Sex: " + sex, 1070, 405 + verticalOffset * 2);
    ctx.fillText("Birthday: " + bday, 1070, 438 + verticalOffset * 3);

    ctx.fillText("Height: " + height, 1345, 372 + verticalOffset);
    ctx.fillText("Weight: " + weight, 1345, 405 + verticalOffset * 2);
    ctx.fillText("Blood Type: " + blood, 1345, 438 + verticalOffset * 3);

    ctx.fillText("Zodiac: " + zodiac, 1595, 372 + verticalOffset);
    ctx.fillText("Occupation: " + occupation, 1595, 405 + verticalOffset * 2);
    ctx.fillText("Likes: " + likes, 1595, 438 + verticalOffset * 3);
}

function drawToReal() {
    visualCanvas.clearRect(0, 0, 1200, 554);
    visualCanvas.drawImage(canvas, 0, 0, 1200, 554);
}

function drawStats() {
    let trion = Math.max(1, document.getElementById("trion").value);
    let attack = Math.max(1, document.getElementById("attack").value);
    let defense = Math.max(1, document.getElementById("defense").value);
    let mobility = Math.max(1, document.getElementById("mobility").value);
    let skill = Math.max(1, document.getElementById("skill").value);
    let range = Math.max(1, document.getElementById("range").value);
    let command = Math.max(1, document.getElementById("command").value);
    let special = Math.max(1, document.getElementById("special").value);

    clipStats();

    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 5;
    ctx.fillStyle = "#00FFDB";
    ctx.beginPath();

    ctx.moveTo(2217, 687 - trion * 19);
    ctx.lineTo(2219 + attack * 13.5, 687 - attack * 13.5);
    ctx.lineTo(2219 + defense * 19.5, 689);
    ctx.lineTo(2219 + mobility * 13.5, 692 + mobility * 13.5);
    ctx.lineTo(2217, 692 + skill * 19);
    ctx.lineTo(2214 - range * 13.5, 692 + range * 13.5);
    ctx.lineTo(2215 - command * 19.5, 689);
    ctx.lineTo(2215 - special * 13.5, 688 - special * 13.5);
    ctx.lineTo(2217, 687 - trion * 19);

    //ctx.stroke();
    ctx.globalAlpha = .45;
    ctx.fill();
    ctx.restore(); // Alpha and clip gone
    ctx.globalAlpha = 1;

    ctx.fillStyle = "white";
    ctx.font = "30px universalis";
    ctx.textAlign = "center";
    ctx.fillText(special, 2027, 561);
    ctx.fillText(trion, 2216, 488);
    ctx.fillText(attack, 2401, 561);
    ctx.fillText(defense, 2460, 719);
    ctx.fillText(mobility, 2380, 883);
    ctx.fillText(skill, 2216, 940);
    ctx.fillText(range, 2055, 883);
    ctx.fillText(command, 1975, 719);

    let total = trion + attack + defense + mobility + skill + range + command;
    ctx.font = "46px universalis";
    ctx.fillText(total, 2062, 953);
}

function clipStats() {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(2216, 499); // Tri
    ctx.lineTo(2352, 555); // Atk
    ctx.lineTo(2409, 689); // Def
    ctx.lineTo(2352, 825); // Mob
    ctx.lineTo(2217, 880); // Skill
    ctx.lineTo(2081, 825); // Range
    ctx.lineTo(2024, 689); // Command
    ctx.lineTo(2081, 556); // Special
    ctx.lineTo(2216, 499); // Tri
    ctx.clip();
}

function drawTriggers() {
    let baseY = 588;
    let baseX = 1231;
    drawTriggerHelper(baseX, baseY, "sub");
    drawTriggerType(baseX + 73, baseY + 10, "sub");
    drawTriggerName(baseX + 76, baseY + 50, "sub");

    baseX += 354;
    drawTriggerHelper(baseX, baseY, "main");
    drawTriggerType(baseX + 73, baseY + 10, "main");
    drawTriggerName(baseX + 76, baseY + 50, "main");
    ctx.filter = "none";
}

function drawTriggerHelper(baseX, baseY, side) {
    ctx.filter = "brightness(0.1)";
    for (let i = 1; i <= 4; i++) {
        let trigger = document.getElementById(`${side}${i}`).value;
        ctx.filter = "brightness(0.1)";
        if (trigger == "FREE TRIGGER" || !triggers[trigger]) {
            ctx.filter = "brightness(1.5)";
            ctx.drawImage(triggers["FREE TRIGGER"].img, baseX - 9, baseY - 9 + 101 * (i - 1));
        } else {
            ctx.drawImage(triggers[trigger].img, baseX, baseY + 101 * (i - 1), 65, 65);
        }
    }
}

function drawTriggerType(baseX, baseY, side) {
    ctx.filter = "brightness(0)";
    ctx.textAlign = "left";
    ctx.font = "16px Arial";
    for (let i = 1; i <= 4; i++) {
        let trigger = document.getElementById(`${side}${i}`).value;
        if (trigger != "FREE TRIGGER" && triggers[trigger]) {
            ctx.fillText(triggers[trigger].type, baseX, baseY + 101 * (i - 1));
        }
    }
}

function drawTriggerName(baseX, baseY, side) {
    ctx.filter = "brightness(0)";
    for (let i = 1; i <= 4; i++) {
        let trigger = document.getElementById(`${side}${i}`).value;
        ctx.font = "20px wild";
        if (trigger != "FREE TRIGGER" && triggers[trigger]) {
            if (trigger.includes(": ")) {
                ctx.font = "18px wild";
                ctx.fillText(trigger.substring(0, trigger.indexOf(":") + 1), baseX, baseY + 101 * (i - 1) - 5);
                ctx.fillText(trigger.substring(trigger.indexOf(":") + 2), baseX, baseY + 101 * (i - 1) + 17);
            } else {
                ctx.fillText(trigger, baseX, baseY + 101 * (i - 1));
            }
        }
    }
}

function drawEmblem() {
    ctx.font = "70px stencil";
    ctx.fillStyle = "Black";
    ctx.fillText(document.getElementById("rankText").value, 990, 885);

    ctx.fillStyle = "White";
    let rank = document.getElementById("rankValue").value;
    if (rank >= 10) {
        ctx.fillText(rank, 1075, 885);
    } else {
        ctx.fillText(rank, 1100, 885);
    }

    return new Promise((res) => {
        let t = new Image();
        t.crossOrigin = "anonymous";
        t.addEventListener("load", () => {
            clipEmblem();
            ctx.drawImage(t, 948, 900, 232, 214);
            ctx.restore();
            res();
        });
        t.addEventListener("error", () => {
            log("Invalid Emblem URL");
            res();
        });
        t.src = document.getElementById("emblem").value;
    });
}

function clipEmblem() {
    ctx.save();

    ctx.beginPath();
    ctx.moveTo(948, 900);
    ctx.lineTo(1180, 900);
    ctx.lineTo(1180, 1032);
    ctx.bezierCurveTo(1175,1060,  1090,1100,  1064,1114);
    ctx.bezierCurveTo(1038,1100,  973,1077,  948,1032);
    ctx.lineTo(948, 900);

    ctx.clip();
}