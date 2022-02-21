import * as random from "./random-seed.js";
let table, popUp, blocker;
let term = [];
let guessStorage = [];
let row = 1;
const seed = random.default;
const generator = seed(new Date().toDateString() + "capybaras4life!");
let keys = {};
let doneWithGame = false;

window.onload = () => {
    let data = JSON.parse(localStorage.getItem(new Date().toDateString()));

    table = document.getElementById("table");
    popUp = document.getElementById("popup");
    blocker = document.getElementById("blocker");
    blocker.addEventListener("click", closePopUp);

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
        if (x.classList.length == 0) {
            keys[x.innerText] = x;
        }
    });

    document.getElementById("share").addEventListener("click", () => {
        share();
        popDisplay();
    });

    if (data != null) {
        let tds = document.getElementsByTagName("td");
        for (let i = 0; i < 25 && i < data.length * 5; i++) {
            tds[i].innerText = data[Math.floor(i / 5)][i % 5];
        }
        data.forEach(x => {
            term = x;
            handleGuess(x.join(""));
        });
    }
};

/**
 * 
 * @param {String} char The character typed or pressed
 */
function type(char) {
    if (doneWithGame)
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
    guessStorage.push(term);
    localStorage.setItem(new Date().toDateString(), JSON.stringify(guessStorage));
    term = [];
    row++;
    if (guess == wordOfTheDay || row > 5) {
        doneWithGame = true;
        updateData(guess);
        share();
        popDisplay();
    }
}

let shakeFlag = false;;

function shake() {
    if (shakeFlag)
        return;
    let r = document.querySelector(`#table > tr:nth-child(${row})`);
    r.style.transform = "translateX(0)";
    r.classList.add("shake");
    shakeFlag = true;
    setTimeout(() => {
        r.classList.remove("shake");
        shakeFlag = false;
    }, 600);
}

function updateData(guess) {
    if (localStorage.getItem("played") === null) {
        localStorage.setItem("played", 0);
    }
    if (localStorage.getItem("wins") === null) {
        localStorage.setItem("wins", 0);
    }
    if (localStorage.getItem("streak") === null) {
        localStorage.setItem("streak", 0);
    }
    if (localStorage.getItem("1") === null) {
        for (let i = 1; i <= 6; i++) {
            localStorage.setItem(i + "", 0);
        }
        localStorage.setItem("DNF", 0);
    }
    if (localStorage.getItem(new Date().toDateString() + "Completed") === null) {
        if (row == 6) {
            localStorage.setItem("DNF", Number(localStorage.getItem("DNF")) + 1);
        } else {
            localStorage.setItem(row - 1, Number(localStorage.getItem(row - 1)) + 1);
        }
        localStorage.setItem("played", Number(localStorage.getItem("played")) + 1);
        if (guess == wordOfTheDay) {
            localStorage.setItem("wins", Number(localStorage.getItem("wins")) + 1);
            localStorage.setItem("streak", Number(localStorage.getItem("streak")) + 1);
        } else {
            localStorage.setItem("streak", 0);
        }
        localStorage.setItem(new Date().toDateString() + "Completed", true);
    }
}

function share() {
    document.getElementById("played").innerText = localStorage.getItem("played");
    document.getElementById("win%").innerText = Math.round(Number(localStorage.getItem("wins")) / Number(localStorage.getItem("played")) * 100);
    document.getElementById("streak").innerText = localStorage.getItem("streak");
    if (localStorage.getItem("1")) {
        for (let i = 1; i <= 6; i++) {
            document.getElementById(i + "").innerText = localStorage.getItem(i + "");
        }
        document.getElementById("DNF").innerText = localStorage.getItem("DNF");
    }
}

function popDisplay() {
    popUp.style.display = "block";
    blocker.style.display = "block";
}

function closePopUp() {
    popUp.style.display = "none";
    blocker.style.display = "none";
}

const words = ["HOUND", "VIPER", "IZUMI", "YUIGA", "RINDO", "RAIZO", "KOHEI", "ISAMI", "SHIRO", "SAEKI", "KUROE", "SHUJI", "ASUMI", "KARIN", "REIJI", "KIRIE", "USAMI", "TSUJI", "IKOMA", "HOSOI", "MAORI", "AZUMA", "OSAMU", "CHIKA", "HYUSE", "MIURA", "SOMEI", "OSANO", "HIURA", "AKANE", "SHIKI", "TOMOE", "AYUMU", "EBINA", "CHANO", "SAITO", "NANAO", "RYOGO", "MARUI", "SEIJI", "ASAMI", "HANAO", "ASUKA", "KEIZO", "IZUHO", "HINOE", "TRION", "ILGAR", "NABIS", "SCARE", "RADAR", "RIFLE", "COBRA", "EGRET", "SENKU", "GEIST", "TIMER", "TOKEN"];

const wordOfTheDay = words[Math.floor(generator() * words.length)];