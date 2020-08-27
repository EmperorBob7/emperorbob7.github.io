//Finished on 8/13/2020
//https://www.reddit.com/r/dailyprogrammer/comments/pii6j/difficult_challenge_1/
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

let number;
let max = 100;
let min = 0;
async function start() {
    let x = await numberPicker();
    console.log(x);
    if (x == "Invalid Input")
        start();
    else {
        number = x;
        guess();
    }
}
function numberPicker() {
    return new Promise((res, rej) => {
        rl.question("Pick a number from 1-100(inclusive): ", function (inp) {
            inp = parseInt(inp);
            if (inp < 1 || inp > 100 || isNaN(inp)) {
                res("Invalid Input");
            } else {
                res(inp);
            }
        });
    });
}
function guess() {
    let guess = max / 2;
    //Binary Search
    while (guess != number) {
        console.log("I guessed " + guess + " and it was wrong.");
        if (guess < number) {
            min = guess;
            guess += Math.round((max - min) / 2);
        }
        else if(guess > number) {
            max = guess;
            guess -= Math.round((max - min) / 2);
        }
    }
    console.log("I guessed " + guess + " and it was right, thanks for playing!");
    rl.close();
}
start();