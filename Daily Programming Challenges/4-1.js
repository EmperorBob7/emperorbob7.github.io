//Finished on 8/17/2020
//https://www.reddit.com/r/dailyprogrammer/comments/pm6oj/2122012_challenge_4_easy/
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

rl.question("Number of passwords?\n", function(passCount) {
    rl.question("Length of passwords?\n", function(len) {
        for(let i = 0; i<passCount; i++) {
            console.log(Math.random().toString(36).substr(2,len));
        }
        rl.close();
    });
});