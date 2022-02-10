let table, popUp;
let term = [];
let row = 1;

window.onload = () => {
    table = document.getElementById("table");
    popUp = document.getElementById("popup");
    for (let i = 0; i < 6; i++) {
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
};

/**
 * 
 * @param {String} char The character typed or pressed
 */
function type(char) {
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
        handleGuess(term.join(""));
    } else if (term.length != 5) {
        term.push(char);
        let elements = document.querySelectorAll(`tr:nth-child(${row}) > td`);
        elements[term.length - 1].innerText = term[term.length - 1];
    }
    let guess = term.join("");
    if (guess.length == 5 && !words.includes(guess)) {
        shake();
    }
}

/**
 * 
 * @param {String} guess Their guess in all caps 
 */
function handleGuess(guess) {
    console.log("guessed");
    for (let i = 0; i < 5; i++) {
        if (guess[i] == wordOfTheDay[i]) {
            document.querySelector(`#table > tr:nth-child(${row}) > td:nth-child(${i + 1})`).classList.add("right");
        } else if (wordOfTheDay.includes(guess[i])) {
            document.querySelector(`#table > tr:nth-child(${row}) > td:nth-child(${i + 1})`).classList.add("half");
        } else {
            document.querySelector(`#table > tr:nth-child(${row}) > td:nth-child(${i + 1})`).classList.add("wrong");
        }
    }
    term = [];
    row++;
}

function shake() {
    let r = document.querySelector(`#table > tr:nth-child(${row})`);
    r.classList.add("shake");
    setTimeout(() => {
        r.classList.remove("shake");
    }, 600);
}

const words = ["HOUND", "VIPER", "IZUMI", "YUIGA", "RINDO", "RAIZO", "KOHEI", "ISAMI", "SHIRO", "SAEKI", "KUROE", "SHUJI", "ASUMI", "KARIN", "REIJI", "KIRIE", "USAMI", "TSUJI", "IKOMA", "HOSOI", "MAORI", "AZUMA", "OSAMU", "CHIKA", "HYUSE", "MIURA", "SOMEI", "OSANO", "HIURA", "AKANE", "SHIKI", "TOMOE", "AYUMU", "EBINA", "CHANO", "SAITO", "NANAO", "RYOGO", "MARUI", "SEIJI", "ASAMI", "HANAO", "ASUKA", "KEIZO", "IZUHO", "HINOE", "TRION", "ILGAR", "NABIS", "SCARE", "RADAR", "RIFLE", "COBRA", "EGRET", "SENKU", "GEIST", "TIMER", "TOKEN"];

const wordOfTheDay = words[15];

console.log(wordOfTheDay);