import * as random from "./random-seed.js";
let table, popUp;
let term = [];
let row = 1;
const seed = random.default;
const generator = seed(new Date().toDateString() + "capybaras4life!");
let keys = {};
let doneWithGame = false;

window.onload = () => {
    table = document.getElementById("table");
    popUp = document.getElementById("popup");
    for (let i = 0; i < 5; i++) {
        let tr = document.createElement("tr");
        for (let j = 0; j < 5; j++) {
            let td = document.createElement("td");
            td.innerText = "\u00A0";
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    let keyboardButtons = document.querySelectorAll("#keyboard > div > button");
    keyboardButtons.forEach(x => {
        x.addEventListener("click", () => { type(x.innerText) });
    });

    document.addEventListener("keydown", (e) => {
        let keyCode = e.keyCode;
        if (keyCode >= 65 && keyCode <= 90)
            type(e.code.substring(3));
        else if (keyCode == 8)
            type("");
        else if (keyCode == 13)
            type("ENTER");
    });

    let keyButtons = document.querySelectorAll("div.row > button");
    keyButtons.forEach(x => {
        if(x.classList.length == 0) {
            keys[x.innerText] = x;
        }
    });
};

/**
 * 
 * @param {String} char The character typed or pressed
 */
function type(char) {
    if(doneWithGame)
        return;
    if (Number.isNaN(char.charCodeAt(0))) {
        if (term.length > 0) {
            let elements = document.querySelectorAll(`tr:nth-child(${row}) > td`);
            elements[term.length - 1].innerText = "\u00A0";
            term.pop();
        }
        return;
    }
    if (char == "ENTER" && term.length != 5) {
        shake();
    } else if (char == "ENTER") {
        if (words.includes(term.join(""))) {
            handleGuess(term.join(""));
        } else {
            shake();
        }
    } else if (term.length != 5) {
        term.push(char);
        let elements = document.querySelectorAll(`tr:nth-child(${row}) > td`);
        elements[term.length - 1].innerText = term[term.length - 1];
    }
}

/**
 * 
 * @param {String} guess Their guess in all caps 
 */
function handleGuess(guess) {
    for (let i = 0; i < 5; i++) {
        if (guess[i] == wordOfTheDay[i]) {
            document.querySelector(`#table > tr:nth-child(${row}) > td:nth-child(${i + 1})`).classList.add("right");
            keys[guess[i]].classList.add("right");
        } else if (wordOfTheDay.includes(guess[i])) {
            document.querySelector(`#table > tr:nth-child(${row}) > td:nth-child(${i + 1})`).classList.add("half");
            keys[guess[i]].classList.add("half");
        } else {
            document.querySelector(`#table > tr:nth-child(${row}) > td:nth-child(${i + 1})`).classList.add("wrong");
            keys[guess[i]].classList.add("wrong");
        }
    }
    term = [];
    row++;
    if(guess == wordOfTheDay || row > 5) {
        doneWithGame = true;
    }
}

let shakeFlag = false;;

function shake() {
    if(shakeFlag)
        return;
    console.log("sus");
    let r = document.querySelector(`#table > tr:nth-child(${row})`);
    r.style.transform = "translateX(0)";
    r.classList.add("shake");
    shakeFlag = true;
    setTimeout(() => {
        r.classList.remove("shake");
        shakeFlag = false;
    }, 600);
}

const words = ["HOUND", "VIPER", "IZUMI", "YUIGA", "RINDO", "RAIZO", "KOHEI", "ISAMI", "SHIRO", "SAEKI", "KUROE", "SHUJI", "ASUMI", "KARIN", "REIJI", "KIRIE", "USAMI", "TSUJI", "IKOMA", "HOSOI", "MAORI", "AZUMA", "OSAMU", "CHIKA", "HYUSE", "MIURA", "SOMEI", "OSANO", "HIURA", "AKANE", "SHIKI", "TOMOE", "AYUMU", "EBINA", "CHANO", "SAITO", "NANAO", "RYOGO", "MARUI", "SEIJI", "ASAMI", "HANAO", "ASUKA", "KEIZO", "IZUHO", "HINOE", "TRION", "ILGAR", "NABIS", "SCARE", "RADAR", "RIFLE", "COBRA", "EGRET", "SENKU", "GEIST", "TIMER", "TOKEN"];

const wordOfTheDay = words[Math.floor(generator() * words.length)];

console.log(wordOfTheDay);