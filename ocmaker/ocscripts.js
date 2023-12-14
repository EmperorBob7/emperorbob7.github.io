let ctx, canvas;
let position = "", age = "", birthday = "", height = "", bloodtype = "", zodiac = "", occupation = "", likes = "", faction = "";
let ty = 0, ax = 0, ay = 0, dx = 0, dy = 0, mx = 0, my = 0, sx = 0, sy = 0, rx = 0, ry = 0, cx = 0, cy = 0, tx = 0, tty = 0;
let trion = "0", attack = "0", defense = "0", mobility = "0", skill = "0", range = "0", command = "0", tactics = "0", total = "0", reactions = "0", strategy = "0", specialtech = "0", recon = "0", attacker = "0", shooter = "0", sniper = "0", gunner = "0";
const TriggerNames = ["opt", "shi", "sco", "egret", "aster", "handgun", "kog", "ray", "viper", "mete", "hound", "speark", "ibis", "light", "escudo", "arifle", "shot", "grenade", "free", "switchbox", "img", "blocked", "soget"];
const TriggerUrls = ["https://cdn.discordapp.com/attachments/571784589882949692/588223959292706817/1560313908255.png", "https://cdn.discordapp.com/attachments/571784589882949692/588226241895858176/1560314451213.png", "https://cdn.discordapp.com/attachments/571784589882949692/588228644481269761/1560315030622.png", "https://cdn.discordapp.com/attachments/571784589882949692/591051692724977665/importantIcon.png", "https://cdn.discordapp.com/attachments/571784589882949692/591053193702539314/importantIcon.png", "https://cdn.discordapp.com/attachments/571784589882949692/591054144995983425/importantIcon.png", "https://cdn.discordapp.com/attachments/571784589882949692/591058852800233503/importantIcon.png", "https://cdn.discordapp.com/attachments/571784589882949692/591060849754374146/importantIcon.png", "https://cdn.discordapp.com/attachments/571784589882949692/591062402783772691/importantIcon.png", "https://cdn.discordapp.com/attachments/571784589882949692/591063097255526400/importantIcon.png", "https://cdn.discordapp.com/attachments/571784589882949692/591064834523660303/importantIcon.png", "https://cdn.discordapp.com/attachments/571784589882949692/591067006355374110/importantIcon.png", "https://cdn.discordapp.com/attachments/571784589882949692/595070798725906442/importantIcon.png", "https://cdn.discordapp.com/attachments/571784589882949692/595071264087998496/importantIcon.png", "https://cdn.discordapp.com/attachments/571784589882949692/595073834692902925/importantIcon.png", "https://cdn.discordapp.com/attachments/571784589882949692/595073561467682818/importantIcon.png", "https://cdn.discordapp.com/attachments/571784589882949692/595074859860492318/importantIcon.png", "https://cdn.discordapp.com/attachments/571784589882949692/595076936133246989/importantIcon.png", "https://cdn.discordapp.com/attachments/571784589882949692/596874086341410826/importantIcon.png", "https://cdn.discordapp.com/attachments/571784589882949692/596787826511577119/importantIcon.png", "./OcTemplate.png", "https://cdn.discordapp.com/attachments/571784589882949692/597287816635875338/importantIcon.png", "https://cdn.discordapp.com/attachments/571784589882949692/610257477631606811/importantIcon.png"];
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
let orderStat = ["TRION: ", "MOBILITY: ", "REACTIONS: ", "RECON: ", "STRATEGY: ", "SPECIAL TECHNIQUES: "];
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
function getTrion(tr) {
    ty = 373 + (-13.25 * (Number(tr) - 1));
}
function getAttack(ar) {
    ax = 821 + (9.25 * (Number(ar) - 1));
    ay = 376 + (-9.25 * (Number(ar) - 1));
}
function getDefense(dr) {
    dx = 825 + (13.25 * (Number(dr) - 1));
    dy = 386;
}
function getMobility(mr) {
    mx = 821 + (9.55 * (Number(mr) - 1));
    my = 395 + (9.55 * (Number(mr) - 1));
}
function getSkill(sr) {
    sx = 812;
    sy = 399 + (13.25 * (Number(sr) - 1));
}
function getRange(rr) {
    rx = 802 + (-9.5 * (Number(rr) - 1));
    ry = 395 + (9.5 * (Number(rr) - 1));
}
function getCommand(cr) {
    cx = 800 + (-13.25 * (Number(cr) - 1));
    cy = 386;
}
function getTactics(tr) {
    tx = 803 + (-9.4 * (Number(tr) - 1));
    tty = 375 + (-9.15 * (Number(tr) - 1));
}
function paramText() {
    ctx.fillStyle = "black";
    ctx.font = "normal normal bold 13px Arial";
    ctx.textAlign = "center";
    ctx.fillText(trion, 812, 253);
    ctx.fillText(attack, 925, 299);
    ctx.fillText(defense, 963, 404);
    ctx.fillText(mobility, 928, 503);
    // ctx.font = "normal normal bolder 19px Arial";
    ctx.fillText(skill, 812, 543);
    // ctx.font = "normal normal bolder 19px Arial";
    // ctx.strokeStyle = "white";
    // ctx.strokeText(skill, 812, 543);
    // ctx.font = "normal normal bold 13px Arial";
    ctx.fillText(range, 707, 505);
    ctx.fillText(command, 663, 405);
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
            let lines = getLines(trigNames[triggers[i]], 122);
            let add = 0;
            for (let i = 0; i < lines.length; i++) {
                ctx.fillText(lines[i], 423, nameY+add);
                add += 12;
            }
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
            let lines = getLines(trigNames[triggers[i]], 122);
            let add = 0;
            for (let i = 0; i < lines.length; i++) {
                ctx.fillText(lines[i], 1111, nameY+add);
                add += 12;
            }
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
    }
}
function testing() {
    let imgData = ctx.getImageData(613, 210, 394, 398);
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
    let orderProf2 = [position, age, birthday, height, bloodtype, zodiac, occupation, likes, faction];
    for (let i = 0; i <= 6; i++) {
        ctx.fillText(orderProf[i] + orderProf2[i], 25, outY);
        outY += 12;
    }
    let lines = getLines(likes, 230);
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

function getLines(text, maxWidth) {
    let words = text.split(" ");
    let lines = [];
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
    let orderStat2 = [trion, mobility, reactions, recon, strategy, specialtech];
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

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(812, 255); // Tri
    ctx.lineTo(905, 291); // Atk
    ctx.lineTo(944, 385); // Def
    ctx.lineTo(905, 479); // Mob
    ctx.lineTo(812, 518); // Skill
    ctx.lineTo(718, 479); // Range
    ctx.lineTo(680, 386); // Command
    ctx.lineTo(719, 293); // Special
    ctx.lineTo(812, 255); // Tri
    ctx.clip();

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
    ctx.restore();
    ctx.globalAlpha = 1;
}
function addTrigger() {
    let e = document.getElementById("customImg");
    let ret = parseInt(e.options[e.selectedIndex].value);
    let imageUrl = newImage(TriggerUrls[ret], false);
    let triggerName = document.getElementById("customTriggerName").value.toUpperCase();
    e = document.getElementById("customTriggerType");
    ret = e.options[e.selectedIndex].value;
    let triggerType = ret;
    texts.push(triggerType);
    trigNames.push(triggerName);
    trigImg.push(imageUrl);
    for (let i = 1; i <= 4; i++) {
        document.getElementById("main" + i).innerHTML += `<option value="${trigNames.length - 1}">${triggerName}</option>`;
    }
    for (let i = 1; i <= 4; i++) {
        document.getElementById("sub" + i).innerHTML += `<option value="${trigNames.length - 1}">${triggerName}</option>`;
    }
}
