let ctx;
let canvas;
let position = "", age = "", birthday = "", height = "", bloodtype = "", zodiac = "", occupation = "", likes = "", faction = "";
let ty = 0, ax = 0, ay = 0, dx = 0, dy = 0, mx = 0, my = 0, sx = 0, sy = 0, rx = 0, ry = 0, cx = 0, cy = 0, tx = 0, tty = 0;
let name, ranking;
let trion = "0", attack = "0", defense = "0", mobility = "0", skill = "0", range = "0", command = "0", tactics = "0", total = "0", reactions = "0", strategy = "0", specialtech = "0", recon = "0", attacker = "0", shooter = "0", sniper = "0", gunner = "0";
const TriggerNames = ["opt", "shi", "sco", "egret", "aster", "handgun", "kog", "ray", "viper", "mete", "hound", "speark", "ibis", "light", "escudo", "arifle", "shot", "grenade", "free", "switchbox", "img", "blocked", "soget"];
const TriggerUrls = ["https://cdn.discordapp.com/attachments/571784589882949692/588223959292706817/1560313908255.png", "https://cdn.discordapp.com/attachments/571784589882949692/588226241895858176/1560314451213.png", "https://cdn.discordapp.com/attachments/571784589882949692/588228644481269761/1560315030622.png", "https://cdn.discordapp.com/attachments/571784589882949692/591051692724977665/importantIcon.png", "https://cdn.discordapp.com/attachments/571784589882949692/591053193702539314/importantIcon.png", "https://cdn.discordapp.com/attachments/571784589882949692/591054144995983425/importantIcon.png", "https://cdn.discordapp.com/attachments/571784589882949692/591058852800233503/importantIcon.png", "https://cdn.discordapp.com/attachments/571784589882949692/591060849754374146/importantIcon.png", "https://cdn.discordapp.com/attachments/571784589882949692/591062402783772691/importantIcon.png", "https://cdn.discordapp.com/attachments/571784589882949692/591063097255526400/importantIcon.png", "https://cdn.discordapp.com/attachments/571784589882949692/591064834523660303/importantIcon.png", "https://cdn.discordapp.com/attachments/571784589882949692/591067006355374110/importantIcon.png", "https://cdn.discordapp.com/attachments/571784589882949692/595070798725906442/importantIcon.png", "https://cdn.discordapp.com/attachments/571784589882949692/595071264087998496/importantIcon.png", "https://cdn.discordapp.com/attachments/571784589882949692/595073834692902925/importantIcon.png", "https://cdn.discordapp.com/attachments/571784589882949692/595073561467682818/importantIcon.png", "https://cdn.discordapp.com/attachments/571784589882949692/595074859860492318/importantIcon.png", "https://cdn.discordapp.com/attachments/571784589882949692/595076936133246989/importantIcon.png", "https://cdn.discordapp.com/attachments/571784589882949692/596874086341410826/importantIcon.png", "https://cdn.discordapp.com/attachments/571784589882949692/596787826511577119/importantIcon.png", "https://cdn.discordapp.com/attachments/571784589882949692/606222154140221441/importantIcon.png", "https://cdn.discordapp.com/attachments/571784589882949692/597287816635875338/importantIcon.png", "https://cdn.discordapp.com/attachments/571784589882949692/610257477631606811/importantIcon.png"];
const TriggerImages = {};
let t0 = new Date();
for (let i = 0; i < TriggerNames.length; i++) {
    if (TriggerNames[i] == "soget")
        TriggerImages[TriggerNames[i]] = newImage(TriggerUrls[i], true);
    else
        TriggerImages[TriggerNames[i]] = newImage(TriggerUrls[i], false);
}

let SquadRank = "";
let triggers = ["Free Trigger", "Free Trigger", "Free Trigger", "Free Trigger", "Free Trigger", "Free Trigger", "Free Trigger", "Free Trigger"];
let orderProf = ["POSITION: ", "AGE: ", "BIRTHDAY: ", "HEIGHT: ", "BLOOD TYPE: ", "ZODIAC: ", "OCCUPATION: ", "LIKES: ", "FACTION: "];
let orderProf2 = [];
let orderStat = ["TRION: ", "MOBILITY: ", "REACTIONS: ", "RECON: ", "STRATEGY: ", "SPECIAL TECHNIQUES: "];
let orderStat2 = [];
let texts = ["", "DEFENSE TRIGGER", "OPTION TRIGGER", "ATTACKER TRIGGER", "ATTACKER TRIGGER", "ATTACKER TRIGGER", "ATTACKER TRIGGER", "SHOOTER TRIGGER", "SHOOTER TRIGGER", "SHOOTER TRIGGER", "SHOOTER TRIGGER", "SNIPER TRIGGER", "SNIPER TRIGGER", "SNIPER TRIGGER", "OPTION TRIGGER", "OPTION TRIGGER", "OPTION TRIGGER", "OPTION TRIGGER", "OPTION TRIGGER", "DEFENSE TRIGGER", "OPTION TRIGGER", "OPTION TRIGGER", "OPTION TRIGGER", "OPTION TRIGGER", "OPTION TRIGGER", "OPTION TRIGGER"];
texts[54] = "TRAP TRIGGER";
texts[55] = "OPTION TRIGGER";
texts[56] = "OPTION TRIGGER";
texts[57] = "OPTION TRIGGER";
texts[58] = "OPTION TRIGGER";
texts[59] = "ATTACKER TRIGGER";
texts[60] = "OPTION TRIGGER";
let trigNames = ["", "SHIELD", "BAGWORM", "RAYGUST", "KOGETSU", "SCORPION", "KOGETSU: SPEAR", "ASTEROID", "HOUND", "METEORA", "VIPER", "EGRET", "IBIS", "LIGHTNING", "GEN'YO", "LEAD BULLET", "SENKU", "STARMAKER", "THRUSTER", "ESCUDO", "CHAMELEON", "DUMMY BEACON", "GRASSHOPPER", "SILENCER", "SPIDER", "TELEPORTER", "Assault Rifle: Viper", "Assault Rifle: Hound", "Assault Rifle: Asteroid", "Assault Rifle: Meteora", "Assault Rifle: Gimlet", "Assault Rifle: Salamander", "Assault Rifle: Tomahawk", "Grenade Gun: Viper", "Grenade Gun: Hound", "Grenade Gun: Asteroid", "Grenade Gun: Meteora", "Grenade Gun: Gimlet", "Grenade Gun: Salamander", "Grenade Gun: Tomahawk", "Shotgun: Viper", "Shotgun: Hound", "Shotgun: Asteroid", "Shotgun: Meteora", "Shotgun: Gimlet", "Shotgun: Salamander", "Shotgun: Tomahawk", "Handgun: Viper", "Handgun: Hound", "Handgun: Asteroid", "Handgun: Meteora", "Handgun: Gimlet", "Handgun: Salamander", "Handgun: Tomahawk", "SWITCHBOX", "BAGWORM TAG", "IDATEN", "GEIST", "CONNECTOR", "SOUGETSU", "FULL ARMS"];
let trigImg = ["", TriggerImages["shi"], TriggerImages["opt"], TriggerImages["ray"], TriggerImages["kog"], TriggerImages["sco"], TriggerImages["speark"], TriggerImages["aster"], TriggerImages["hound"], TriggerImages["mete"], TriggerImages["viper"], TriggerImages["egret"], TriggerImages["ibis"], TriggerImages["light"], TriggerImages["opt"], TriggerImages["opt"], TriggerImages["opt"], TriggerImages["opt"], TriggerImages["opt"], TriggerImages["escudo"], TriggerImages["opt"], TriggerImages["opt"], TriggerImages["opt"], TriggerImages["opt"], TriggerImages["opt"], TriggerImages["opt"], TriggerImages["arifle"], TriggerImages["arifle"], TriggerImages["arifle"], TriggerImages["arifle"], TriggerImages["arifle"], TriggerImages["arifle"], TriggerImages["arifle"], TriggerImages["grenade"], TriggerImages["grenade"], TriggerImages["grenade"], TriggerImages["grenade"], TriggerImages["grenade"], TriggerImages["grenade"], TriggerImages["grenade"], TriggerImages["shot"], TriggerImages["shot"], TriggerImages["shot"], TriggerImages["shot"], TriggerImages["shot"], TriggerImages["shot"], TriggerImages["shot"], TriggerImages["handgun"], TriggerImages["handgun"], TriggerImages["handgun"], TriggerImages["handgun"], TriggerImages["handgun"], TriggerImages["handgun"], TriggerImages["handgun"], TriggerImages["switchbox"], TriggerImages["opt"], TriggerImages["opt"], TriggerImages["opt"], TriggerImages["opt"], TriggerImages["soget"], TriggerImages["opt"]];
//0-25 is regular 3-6 Attacker 7-10 Shooter 11-13 Sniper 14-18 Attachments 19-25 Extras 26-32 Assault Rifles 33-39 Grenade Launchers 40-46 Shotguns 47-53 Handguns

function newImage(src, bool) {
    let newimg = new Image();
    if (bool) {
        newimg.onload = function () {
            begin();
        }
    }
    newimg.src = src;
    return newimg;
}
function begin() {
    canvas = document.getElementById("cv");
    ctx = canvas.getContext("2d");
    ctx.drawImage(TriggerImages["img"], 0, 0, 1280, 720);
    draw();
    reset();
}
function reset() {
    ctx.drawImage(TriggerImages["img"], 0, 0, 1280, 720);
}
function getTrigs() {
    for (let i = 0; i < 4; i++) {
        let e = document.getElementById("main" + (i + 1));
        let ret = e.options[e.selectedIndex].value;
        triggers[i] = parseInt(ret);
    }
    let z = 0;
    for (let i = 4; i < 8; i++) {
        let e = document.getElementById("sub" + (z + 1));
        let ret = e.options[e.selectedIndex].value;
        triggers[i] = parseInt(ret);
        z++;
    }
}
function getRank() {
    let e = document.getElementById("squadrank");
    let ret = e.options[e.selectedIndex].value;
    SquadRank = ret;
}
function getParams() {
    trion = document.getElementById("trion").value;
    attack = document.getElementById("attack").value;
    defense = document.getElementById("defense").value;
    mobility = document.getElementById("mobility").value;
    skill = document.getElementById("skill").value;
    range = document.getElementById("range").value;
    command = document.getElementById("command").value;
    tactics = document.getElementById("tactics").value;
    reactions = document.getElementById("reactions").value;
    strategy = document.getElementById("strategy").value;
    specialtech = document.getElementById("specialtech").value;
    recon = document.getElementById("recon").value;
    attacker = document.getElementById("attacker").value;
    shooter = document.getElementById("shooter").value;
    sniper = document.getElementById("sniper").value;
    gunner = document.getElementById("gunner").value;
}
function paramText(int) {
    if (int > 24) {
        return "GUNNER TRIGGER";
    }
    else {
        return texts[int];
    }
}
function getTrion(tz) {
    let tr = tz;
    switch (tr) {
        case "1":
            ty = 373;
            break;
        case "2":
            ty = 360;
            break;
        case "3":
            ty = 347;
            break;
        case "4":
            ty = 334;
            break;
        case "5":
            ty = 320;
            break;
        case "6":
            ty = 307;
            break;
        case "7":
            ty = 294;
            break;
        case "8":
            ty = 281;
            break;
        case "9":
            ty = 268;
            break;
        case "10":
            ty = 257;
            break;
        default:
            ty = 257;
    }
}
function getAttack(ar) {
    switch (ar) {
        case "1":
            ax = 821;
            ay = 376;
            break;
        case "2":
            ax = 830;
            ay = 367;
            break;
        case "3":
            ax = 839;
            ay = 358;
            break;
        case "4":
            ax = 849;
            ay = 348;
            break;
        case "5":
            ax = 858;
            ay = 339;
            break;
        case "6":
            ax = 867;
            ay = 330;
            break;
        case "7":
            ax = 877;
            ay = 320;
            break;
        case "8":
            ax = 886;
            ay = 311;
            break;
        case "9":
            ax = 895;
            ay = 302;
            break;
        case "10":
            ax = 903;
            ay = 294;
            break;
        default:
            ax = 903;
            ay = 294;
    }
}
function getDefense(dr) {
    switch (dr) {
        case "1":
            dx = 825;
            dy = 386;
            break;
        case "2":
            dx = 838;
            dy = 386;
            break;
        case "3":
            dx = 851;
            dy = 386;
            break;
        case "4":
            dx = 864;
            dy = 386;
            break;
        case "5":
            dx = 878;
            dy = 386;
            break;
        case "6":
            dx = 891;
            dy = 386;
            break;
        case "7":
            dx = 904;
            dy = 386;
            break;
        case "8":
            dx = 917;
            dy = 386;
            break;
        case "9":
            dx = 930;
            dy = 386;
            break;
        case "10":
            dx = 942;
            dy = 386;
            break;
        default:
            dx = 942;
            dy = 386;
    }
}
function getMobility(mr) {
    switch (mr) {
        case "1":
            mx = 821;
            my = 395;
            break;
        case "2":
            mx = 830;
            my = 404;
            break;
        case "3":
            mx = 840;
            my = 414;
            break;
        case "4":
            mx = 849;
            my = 423;
            break;
        case "5":
            mx = 859;
            my = 433;
            break;
        case "6":
            mx = 868;
            my = 442;
            break;
        case "7":
            mx = 877;
            my = 451;
            break;
        case "8":
            mx = 886;
            my = 460;
            break;
        case "9":
            mx = 896;
            my = 470;
            break;
        case "10":
            mx = 904;
            my = 478;
            break;
        default:
            mx = 904;
            my = 478;
    }
}
function getSkill(sr) {
    switch (sr) {
        case "1":
            sx = 812;
            sy = 399;
            break;
        case "2":
            sx = 812;
            sy = 412;
            break;
        case "3":
            sx = 812;
            sy = 425;
            break;
        case "4":
            sx = 812;
            sy = 439;
            break;
        case "5":
            sx = 812;
            sy = 452;
            break;
        case "6":
            sx = 812;
            sy = 465;
            break;
        case "7":
            sx = 812;
            sy = 478;
            break;
        case "8":
            sx = 812;
            sy = 491;
            break;
        case "9":
            sx = 812;
            sy = 504;
            break;
        case "10":
            sx = 812;
            sy = 515;
            break;
        default:
            sx = 812;
            sy = 515;
    }
}
function getRange(rr) {
    switch (rr) {
        case "1":
            rx = 802;
            ry = 395;
            break;
        case "2":
            rx = 792;
            ry = 405;
            break;
        case "3":
            rx = 783;
            ry = 414;
            break;
        case "4":
            rx = 774;
            ry = 423;
        case "5":
            rx = 764;
            ry = 433;
            break;
        case "6":
            rx = 755;
            ry = 442;
            break;
        case "7":
            rx = 745;
            ry = 452;
            break;
        case "8":
            rx = 736;
            ry = 461;
            break;
        case "9":
            rx = 727;
            ry = 470;
            break;
        case "10":
            rx = 720;
            ry = 477;
            break;
        default:
            rx = 720;
            ry = 477;
    }
}
function getCommand(cr) {
    switch (cr) {
        case "1":
            cx = 800;
            cy = 386;
            break;
        case "2":
            cx = 786;
            cy = 386;
            break;
        case "3":
            cx = 773;
            cy = 386;
            break;
        case "4":
            cx = 760;
            cy = 386;
        case "5":
            cx = 747;
            cy = 386;
            break;
        case "6":
            cx = 734;
            cy = 386;
            break;
        case "7":
            cx = 721;
            cy = 386;
            break;
        case "8":
            cx = 707;
            cy = 386;
            break;
        case "9":
            cx = 694;
            cy = 386;
            break;
        case "10":
            cx = 684;
            cy = 386;
            break;
        default:
            cx = 684;
            cy = 386;
    }
}
function getTactics(tr) {
    switch (tr) {
        case "1":
            tx = 803;
            tty = 375;
            break;
        case "2":
            tx = 794;
            tty = 368;
            break;
        case "3":
            tx = 784;
            tty = 358;
            break;
        case "4":
            tx = 775;
            tty = 349;
        case "5":
            tx = 766;
            tty = 340;
            break;
        case "6":
            tx = 757;
            tty = 331;
            break;
        case "7":
            tx = 747;
            tty = 321;
            break;
        case "8":
            tx = 738;
            tty = 312;
            break;
        case "9":
            tx = 729;
            tty = 303;
            break;
        case "10":
            tx = 722;
            tty = 296;
            break;
        default:
            tx = 722;
            tty = 296;
    }
}
function paramText() {
    ctx.fillStyle = "black";
    ctx.font = "normal normal bold 13px Arial";
    ctx.textAlign = "center";
    ctx.fillText(trion, 812, 253);
    ctx.fillText(attack, 922, 299);
    ctx.fillText(defense, 950, 404);
    ctx.fillText(mobility, 928, 503);
    ctx.font = "normal normal bold 17px Arial";
    ctx.fillText(skill, 812, 543);
    ctx.font = "normal normal bold 19px Arial";
    ctx.strokeStyle = "lightgray";
    ctx.strokeText(skill, 812, 543);
    ctx.font = "normal normal bold 13px Arial";
    ctx.fillText(range, 697, 505);
    ctx.fillText(command, 672, 405);
    ctx.fillText(tactics, 701, 304);
    ctx.font = "normal normal bold 26px Arial";
    ctx.textAlign = "start";
    let sum = trion + "+" + attack + "+" + defense + "+" + mobility + "+" + skill + "+" + range + "+" + command + "+" + tactics;
    ctx.fillText(eval(sum), 719, 554);
}
let textY, imgY, nameY, freeY;
function drawGuns(xVal, xVal2, xVal3, z) {
    ctx.fillText("GUNNER TRIGGER", xVal, textY);
    ctx.drawImage(trigImg[triggers[z]], xVal2, imgY, 39, 43);
    ctx.font = "normal normal bold 11.5px Arial";
    ctx.fillText(trigNames[triggers[z]], xVal3, nameY);
}
function trigText() {
    ctx.fillStyle = "black";
    textY = 264;
    imgY = 260;
    nameY = 290;
    freeY = 251;
    for (let i = 0; i < 4; i++) {
        ctx.font = "normal normal bold 10px Arial";
        if (triggers[i] == 0) {
            ctx.drawImage(TriggerImages["free"], 361, freeY);
        }
        else if (triggers[i] > 25 && triggers[i] <= 53) {
            drawGuns(418, 372, 420, i);
        }
        else if (triggers[i] == 55) {
            ctx.fillText(texts[triggers[i]], 418, textY);
            ctx.drawImage(TriggerImages["opt"], 372, imgY, 39, 43);
            ctx.font = "normal normal bold 13px Arial";
            ctx.fillText(trigNames[triggers[i]], 423, nameY);
            freeY += 71;
            ctx.drawImage(TriggerImages["blocked"], 361, freeY);
            freeY += 71;
            ctx.drawImage(TriggerImages["blocked"], 361, freeY);
            freeY += 71;
            ctx.drawImage(TriggerImages["blocked"], 361, freeY);
            break;
        }
        else {
            ctx.fillText(texts[triggers[i]], 418, textY);
            ctx.drawImage(trigImg[triggers[i]], 372, imgY, 39, 43);
            ctx.font = "normal normal bold 13px Arial";
            ctx.fillText(trigNames[triggers[i]], 423, nameY);
        }
        textY += 71;
        imgY += 71;
        nameY += 71;
        freeY += 71;
    }
    textY = 209;
    imgY = 205;
    nameY = 235;
    freeY = 196;
    for (let i = 4; i < 8; i++) {
        ctx.font = "normal normal bold 10px Arial";
        if (triggers[i] == 0) {
            ctx.drawImage(TriggerImages["free"], 1049, freeY);
        }
        else if (triggers[i] > 25 && triggers[i] <= 53) {
            drawGuns(1106, 1060, 1108, i);
        }
        else {
            ctx.fillText(texts[triggers[i]], 1106, textY);
            ctx.drawImage(trigImg[triggers[i]], 1060, imgY, 39, 43);
            ctx.font = "normal normal bold 13px Arial";
            ctx.fillText(trigNames[triggers[i]], 1111, nameY);
        }
        textY += 71;
        imgY += 71;
        nameY += 71;
        freeY += 71;
    }
}
function writeName() {
    let charName = document.getElementById("name").value;
    ctx.fillStyle = "white";
    ctx.font = "normal normal normal 59.6px crusader";
    ctx.fillText(charName, 340, 89, 629);
}
function writeRank() {
    let rank = document.getElementById("ranking").value;
    ctx.fillStyle = "white";
    ctx.font = "normal normal normal 38px stencil";
    if (SquadRank == "A") {
        ctx.fillText(rank, 109, 63);
    }
    else {
        ctx.font = "normal normal normal 32px stencil";
        ctx.fillText(rank, 101, 63, 55);
    }
}
let emblemUrl;
let emblem;
function drawSquadEmblem() {
    emblemUrl = document.getElementById("emblem").value;
    emblem = new Image();
    emblem.src = emblemUrl;
    emblem.onload = function () {
        ctx.drawImage(emblem, 30, 73, 133, 121);
        let imageData = ctx.getImageData(30, 73, 133, 121);
        let pixels = imageData.data;
        for (var i = 0; i < pixels.length; i += 4) {
            let lightness = parseInt((pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3);
            pixels[i] = lightness;
            pixels[i + 1] = lightness;
            pixels[i + 2] = lightness;
        }
        ctx.putImageData(imageData, 30, 73);
    }
}
function testing() {
    let imgData = ctx.getImageData(613, 210, 394, 398);
    let imgData2 = ctx.getImageData(1021, 162, 238, 322);
    ctx.putImageData(imgData, 0, 0);
}
function getProfile() {
    position = document.getElementById("position").value.toUpperCase();
    age = document.getElementById("age").value.toUpperCase();
    birthday = document.getElementById("birthday").value.toUpperCase();
    height = document.getElementById("height").value.toUpperCase();
    bloodtype = document.getElementById("blood-type").value.toUpperCase();
    zodiac = document.getElementById("zodiac").value.toUpperCase();
    occupation = document.getElementById("occupation").value.toUpperCase();
    likes = document.getElementById("likes").value.toUpperCase();
    faction = document.getElementById("faction").value.toUpperCase();
}
function drawProfile() {
    let outY = 570;
    ctx.font = "normal normal normal 12px arial";
    orderProf2 = [position, age, birthday, height, bloodtype, zodiac, occupation, likes, faction];
    for (let i = 0; i <= 6; i++) {
        ctx.fillText(orderProf[i] + orderProf2[i], 25, outY);
        outY += 12;
    }
    getLines(likes, 230);
    for (let i = 0; i < lines.length; i++) {
        if (i == 0) {
            ctx.fillText("LIKES: " + lines[i], 25, outY);
        }
        else {
            ctx.fillText(lines[i], 25, outY);
        }
        outY += 12;
    }
    ctx.fillText("FACTION: " + orderProf2[8], 25, outY);
}
let lines = [];
function getLines(text, maxWidth) {
    let words = text.split(" ");
    lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
        let word = words[i];
        let width = ctx.measureText(currentLine + " " + word).width;
        if (width < maxWidth) {
            currentLine += " " + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);
    return lines;
}
function drawStats() {
    let outY = 275;
    ctx.font = "normal normal normal 12px arial";
    orderStat2 = [trion, mobility, reactions, recon, strategy, specialtech];
    if (parseInt(attacker) > 0 && parseInt(shooter) > 0 && parseInt(sniper) > 0 && parseInt(gunner) > 0) {
        for (let i = 0; i <= 5; i++) {
            ctx.fillText(orderStat[i] + orderStat2[i], 25, outY);
            outY += 12;
        }
        if (parseInt(attacker) > 0) {
            ctx.fillText("ATTACKER: " + attacker, 25, outY);
            outY += 12;
        }
        if (parseInt(shooter) > 0) {
            ctx.fillText("SHOOTER: " + shooter, 25, outY);
            outY += 12;
        }
        if (parseInt(sniper) > 0) {
            ctx.fillText("SNIPER: " + sniper, 25, outY);
            outY += 12;
        }
        if (parseInt(gunner) > 0) {
            ctx.fillText("GUNNER: " + gunner, 25, outY);
            outY += 12;
        }
    }
    else {
        for (let i = 0; i <= 5; i++) {
            ctx.fillText(orderStat[i] + orderStat2[i], 25, outY);
            outY += 14;
        }
        if (parseInt(attacker) > 0) {
            ctx.fillText("ATTACKER: " + attacker, 25, outY);
            outY += 14;
        }
        if (parseInt(shooter) > 0) {
            ctx.fillText("SHOOTER: " + shooter, 25, outY);
            outY += 14;
        }
        if (parseInt(sniper) > 0) {
            ctx.fillText("SNIPER: " + sniper, 25, outY);
            outY += 14;
        }
        if (parseInt(gunner) > 0) {
            ctx.fillText("GUNNER: " + gunner, 25, outY);
            outY += 14;
        }
    }
}
function drawRank() {
    ctx.font = "normal normal normal 37px stencil";
    ctx.fillStyle = "black";
    ctx.fillText(SquadRank, 50, 63);
}
function draw() {
    reset();
    writeName();
    writeRank();
    drawSquadEmblem();
    getTrigs();
    getParams();
    trigText();
    paramText();

    getRank();
    drawRank();
    getProfile();
    drawProfile();
    drawStats();

    getTrion(trion);
    getAttack(attack);
    getDefense(defense);
    getMobility(mobility);
    getSkill(skill);
    getRange(range);
    getCommand(command);
    getTactics(tactics);

    ctx.beginPath();
    ctx.globalAlpha = .45;
    ctx.moveTo(812, ty);
    ctx.lineTo(ax, ay);
    ctx.lineTo(dx, dy);
    ctx.lineTo(mx, my);
    ctx.lineTo(sx, sy);
    ctx.lineTo(rx, ry);
    ctx.lineTo(cx, cy);
    ctx.lineTo(tx, tty);
    ctx.fill();
    ctx.globalAlpha = 1;
}