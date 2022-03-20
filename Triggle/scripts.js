import * as random from "./random-seed.js";
const worker = new Worker("./worker.js");
const clipboard = [];
const seed = random.default;
const generator = seed(new Date().toDateString() + "capybaras4life!");
const keys = {};

let table, popUp, blocker; //DOM Variables

let term = []; //Current Guess
let guessStorage = []; //Storage of all valid guesses
let row = 1;
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

    document.getElementById("help").addEventListener("click", () => alert("Guess the TRIGGLE in five tries.\n\nEach guess must be a valid five-letter word. Hit the enter button to submit.\n\nAfter each guess, the color of the tiles will change to show how close your guess was to the word.\n\nGreen means it's correct.\nYellow means it's in the word but in the wrong spot.\nRed means the letter is not wrong."));
    document.getElementById("shareButton").addEventListener("click", copyToClipboard);
    document.getElementById("displayWord").innerText = "The Word Was: " + wordOfTheDay;
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
    clipboard.push([]);
    let WOTD = wordOfTheDay;
    for (let i = 0; i < 5; i++) {
        if (guess[i] == wordOfTheDay[i]) {
            document.querySelector(`#table > tr:nth-child(${row}) > td:nth-child(${i + 1})`).classList.add("right");
            keys[guess[i]].classList.add("right");
            clipboard[row - 1][i] = "🟩";
            WOTD = WOTD.replace(guess[i], ".");
        }
    }
    for (let i = 0; i < 5; i++) {
        if (WOTD.includes(guess[i])) {
            document.querySelector(`#table > tr:nth-child(${row}) > td:nth-child(${i + 1})`).classList.add("half");
            keys[guess[i]].classList.add("half");
            clipboard[row - 1][i] = "🟨";
        } else if (guess[i] != wordOfTheDay[i]) {
            document.querySelector(`#table > tr:nth-child(${row}) > td:nth-child(${i + 1})`).classList.add("wrong");
            keys[guess[i]].classList.add("wrong");
            clipboard[row - 1][i] = "⬛";
        }
        WOTD = WOTD.replace(guess[i], ".");
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

function shake() {
    let r = document.querySelector(`#table > tr:nth-child(${row})`);
    if (r.classList.contains("shake"))
        return;
    r.style.transform = "translateX(0)";
    r.classList.add("shake");
    setTimeout(() => {
        r.classList.remove("shake");
    }, 600);
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

function copyToClipboard() {
    let triggleNum = Math.ceil(Math.abs(new Date("Sun Feb 20 2022").getTime() - new Date().getTime()) / (1000 * 3600 * 24));
    let str = `Triggle ${triggleNum} ${row - 1}/5\n\n`;
    for (let i = 0; i < clipboard.length; i++) {
        for (let j = 0; j < 5; j++) {
            str += clipboard[i][j];
        }
        str += ` ||${guessStorage[i].join("")}||\n`;
    }
    str = str.trimEnd();
    save(str);
}

function save(text) {
    let c = document.getElementById("content");
    c.value = text;
    c.select();
    navigator.clipboard.writeText(c.value);
    alertMsg("Copied to Clipboard!");
}

function alertMsg(msg) {
    let div = document.getElementById("messagePopUp");
    if (div.style.display !== "block") {
        div.style.display = "block";
        div.innerText = msg;
        div.classList.add("popper");
        setTimeout(() => {
            div.classList.remove("popper");
            div.style.display = "none";
        }, 1500);
    }
}

const words = ["HOUND", "VIPER", "IZUMI", "YUIGA", "RINDO", "RAIZO", "KOHEI", "ISAMI", "SHIRO", "SAEKI", "KUROE", "SHUJI", "ASUMI", "KARIN", "REIJI", "KIRIE", "USAMI", "TSUJI", "IKOMA", "HOSOI", "MAORI", "AZUMA", "OSAMU", "CHIKA", "HYUSE", "MIURA", "SOMEI", "OSANO", "HIURA", "AKANE", "SHIKI", "TOMOE", "AYUMU", "EBINA", "CHANO", "SAITO", "NANAO", "RYOGO", "MARUI", "SEIJI", "ASAMI", "HANAO", "ASUKA", "KEIZO", "IZUHO", "HINOE", "TRION", "ILGAR", "NABIS", "SCARE", "RADAR", "COBRA", "EGRET", "SENKU", "GEIST", "TIMER", "TOKEN"];
const wordOfTheDay = words[Math.floor(generator() * words.length)];