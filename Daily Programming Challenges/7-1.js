//Finished on 8/29/2020
//https://www.reddit.com/r/dailyprogrammer/comments/pr2xr/2152012_challenge_7_easy/
//Took a big break!!
const morseArr = ".-,-...,-.-.,-..,.,..-.,--.,....,..,.---,-.-,.-..,--,-.,---,.--.,--.-,.-.,...,-,..-,...-,.--,-..-,-.--,--..".split(",");
const englishArr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

rl.question("Enter Morse Code My King\n", (morse) => {
    morse = morse.split(" / ");
    let out = "";
    for (let i = 0; i < morse.length; i++) {
        let miniArr = morse[i].split(" ");
        for (let j = 0; j < miniArr.length; j++) {
            out += englishArr[morseArr.indexOf(miniArr[j])];
        }
        out += " ";
    }
    console.log(out);
    rl.close();
});