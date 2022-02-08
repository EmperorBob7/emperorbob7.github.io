let table;
let term = [];
let row = 1;

window.onload = () => {
    table = document.getElementById("table");
    for(let i = 0; i<6; i++) {
        let tr = document.createElement("tr");
        for(let j = 0; j< 6; j++) {
            let td = document.createElement("td");
            td.innerText = "\u00A0";
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    let keyboardButtons = document.querySelectorAll("#keyboard > div > button");
    keyboardButtons.forEach(x => {
        x.addEventListener("click", () => {type(x.innerText)});
    });
};

/**
 * 
 * @param {String} char The character typed or pressed
 */
function type(char) {
    console.log(char);
    if(term.length < 6) {
        term.push(char);
        let elements = document.querySelectorAll(`tr:nth-child(${row}) > td`);
        console.log(elements);
        elements[term.length-1].innerText = term[term.length-1];
    }
}