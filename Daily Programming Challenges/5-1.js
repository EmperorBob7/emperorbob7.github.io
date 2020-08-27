//Finished on 8/19/2020
//https://www.reddit.com/r/dailyprogrammer/comments/pnhyn/2122012_challenge_5_easy/
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);
const fs = require("fs");
let pass;

async function run() {
    pass = fs.readFileSync("./5-1.txt","utf-8");
    let isIn = await attempt();
    while (!isIn) {
        console.log("Your password was wrong!\n");
        isIn = await attempt();
    }
    console.log("No way how did you get here O_O");
    rl.close();
}
function attempt() {
    return new Promise((res, rej) => {
        rl.question("What is the password?\n", (response) => {
            res(response == pass);
        });
    });
}
run();