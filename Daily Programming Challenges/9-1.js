////Finished on 9/04/2020
//https://www.reddit.com/r/dailyprogrammer/comments/pu1rf/2172012_challenge_9_easy/
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);
rl.question("Enter text/digits:\n", (digits) => {
    console.log(digits.split("").sort().join(""));
    rl.close();
});