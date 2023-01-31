/**
 * @class Trigger
 * @param img {Image}
 * @param type {String}
 */
class Trigger {
    constructor(img) {
        this.img = img;
        this.type = "OPTION TRIGGER";
    }

    set(img, type) {
        this.img = img;
        this.type = type;
    }
}

const names = ["Free_Trigger", "Assault_Rifle", "Asteroid", "Egret", "Escudo", "Gatling_Gun", "Grenade_Launcher", "Handgun", "Hound", "Ibis", "Kogetsu_Spear", "Kogetsu", "Lightning", "Meteor", "Optional", "Raygust", "Scorpion", "Shield", "Shotgun", "Sogetsu", "Spider_Handgun", "Switchbox", "Viper", "Blank"];
const allTriggers = [/*"FREE TRIGGER", "SHIELD", "BAGWORM", */"RAYGUST", "KOGETSU", "SCORPION", "KOGETSU: SPEAR", "ASTEROID", "HOUND", "METEOR", "VIPER", "EGRET", "IBIS", "LIGHTNING", "GEN'YO", "LEAD BULLET", "SENKU", "STARMAKER", "THRUSTER", "ESCUDO", "CHAMELEON", "DUMMY BEACON", "GRASSHOPPER", "SILENCER", "SPIDER", "TELEPORTER", "Assault Rifle: Viper", "Assault Rifle: Hound", "Assault Rifle: Asteroid", "Assault Rifle: Meteor", "Assault Rifle: Gimlet", "Assault Rifle: Salamander", "Assault Rifle: Tomahawk", "Grenade Launcher: Viper", "Grenade Launcher: Hound", "Grenade Launcher: Asteroid", "Grenade Launcher: Meteor", "Grenade Launcher: Gimlet", "Grenade Launcher: Salamander", "Grenade Launcher: Tomahawk", "Shotgun: Viper", "Shotgun: Hound", "Shotgun: Asteroid", "Shotgun: Meteor", "Shotgun: Gimlet", "Shotgun: Salamander", "Shotgun: Tomahawk", "Handgun: Viper", "Handgun: Hound", "Handgun: Asteroid", "Handgun: Meteor", "Handgun: Gimlet", "Handgun: Salamander", "Handgun: Tomahawk", "Handgun: Spider", "SWITCHBOX", "IDATEN", "GEIST", "CONNECTOR", "SOGETSU", "FULL ARMS", "Gatling Gun: Asteroid", "Gatling Gun: Hound", "Gatling Gun: Meteor", "Gatling Gun: Viper", "Gatling Gun: Tomahawk", "Gatling Gun: Salamander", "Gatling Gun: Gimlet"];

/** @type {String | Image} */
const triggerUrls = {};
/** @type {String | Trigger} */
const triggers = {};

async function loadImages() {
    for (let n of names) {
        await makeImage(n);
    }
    for (let t of allTriggers) {
        triggers[t] = new Trigger(triggerUrls["Optional"]);
    }

    triggers["BAGWORM TAG"] = new Trigger(triggerUrls["Optional"]);
    assignTriggers();
};

function makeImage(name) {
    return new Promise((res, rej) => {
        let img = new Image();
        img.onload = () => {
            triggerUrls[name] = img;
            res();
        };
        img.src = `./images/triggers/${name}.png`;
    });
}

function writeDatalist() {
    allTriggers.sort();
    allTriggers.unshift("FREE TRIGGER");
    allTriggers.unshift("SHIELD");
    allTriggers.unshift("BAGWORM");

    for (let i = 1; i <= 4; i++) {
        let list = document.getElementById(`sub${i}list`);
        let list2 = document.getElementById(`main${i}list`);
        for (let n of allTriggers) {
            let option = document.createElement("option");
            option.value = n;
            option.innerText = n.replace("_", " ");
            list.appendChild(option);

            let option2 = option.cloneNode();
            option2.innerText = n.replace("_", " ");
            list2.appendChild(option2);
            if (n == "FREE TRIGGER") {
                option.selected = "selected";
                option2.selected = "selected";
            }
        }
    }

    let option = document.createElement("option");
    option.value = "BAGWORM TAG";
    option.innerText = "BAGWORM TAG";
    document.getElementById("sub1list").appendChild(option);
}

function assignTriggers() {
    triggers["FREE TRIGGER"].set(triggerUrls["Free_Trigger"], "ATTACKER TRIGGER");
    triggers["SHIELD"].set(triggerUrls["Shield"], "DEFENSE TRIGGER");
    triggers["RAYGUST"].set(triggerUrls["Raygust"], "ATTACKER TRIGGER");
    triggers["KOGETSU"].set(triggerUrls["Kogetsu"], "ATTACKER TRIGGER");
    triggers["SCORPION"].set(triggerUrls["Scorpion"], "ATTACKER TRIGGER");
    triggers["KOGETSU: SPEAR"].set(triggerUrls["Kogetsu_Spear"], "ATTACKER TRIGGER");
    triggers["ASTEROID"].set(triggerUrls["Asteroid"], "SHOOTER TRIGGER");
    triggers["HOUND"].set(triggerUrls["Hound"], "SHOOTER TRIGGER");
    triggers["METEOR"].set(triggerUrls["Meteor"], "SHOOTER TRIGGER");
    triggers["VIPER"].set(triggerUrls["Viper"], "SHOOTER TRIGGER");
    triggers["EGRET"].set(triggerUrls["Egret"], "SNIPER TRIGGER");
    triggers["IBIS"].set(triggerUrls["Ibis"], "SNIPER TRIGGER");
    triggers["LIGHTNING"].set(triggerUrls["Lightning"], "SNIPER TRIGGER");
    triggers["ESCUDO"].set(triggerUrls["Escudo"], "DEFENSE TRIGGER");
    triggers["Handgun: Spider"].set(triggerUrls["Spider_Handgun"], "GUNNER TRIGGER");

    let bullets = ["Asteroid", "Hound", "Meteor", "Viper", "Gimlet", "Salamander", "Tomahawk"];
    let guns = ["Assault_Rifle", "Handgun", "Gatling_Gun", "Shotgun", "Grenade_Launcher"];
    for (let g of guns) {
        for (let b of bullets) {
            triggers[`${g.replace("_", " ")}: ${b}`].set(triggerUrls[g], "GUNNER TRIGGER");
        }
    }

    triggers["SWITCHBOX"].set(triggerUrls["Switchbox"], "TRAP TRIGGER");
    triggers["SOGETSU"].set(triggerUrls["Sogetsu"], "ATTACKER TRIGGER");
}