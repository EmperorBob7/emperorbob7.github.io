//Finished on 8/17/2020
//https://www.reddit.com/r/dailyprogrammer/comments/pm6sq/2122012_challenge_4_intermediate/
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

rl.question("Insert math\n", function(math) {
    try {
        console.log(eval(math));
    }
    catch (err) {
        console.log("You had an invalid input");
    }
    rl.close();
});