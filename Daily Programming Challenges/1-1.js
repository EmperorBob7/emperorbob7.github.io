//Finished on 8/13/2020
//https://www.reddit.com/r/dailyprogrammer/comments/pih8x/easy_challenge_1/
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

let name, age, redditUsername;
rl.question("What is your name?\n", function(n) {
    rl.question("What is your age?\n", function(a) {
        rl.question("What is your Reddit Username?\n", function(ru) {
            name = n;
            age = a;
            redditUsername = ru;
            rl.close();
            console.log(`your name is ${name}, you are ${age} years old, and your username is ${redditUsername}`);
        });
    });
});