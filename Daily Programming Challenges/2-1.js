//Finished on 8/14/2020
//https://www.reddit.com/r/dailyprogrammer/comments/pjbj8/easy_challenge_2/
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

rl.question("What would you like to find? (F)(M)(A)\n", function (response) {
    if(response == "F")
        force();
    if(response == "M")
        mass();
    if(response == "A")
        acceleration();
});
function force() {
    rl.question("What is your Mass?\n", function(m) {
        rl.question("What is your Acceleration?\n", function(a) {
            console.log(`Your Force is: ${m * a}`);
            rl.close();
        });
    });
}
function mass() {
    rl.question("What is your Force?\n", function(f) {
        rl.question("What is your Acceleration?\n", function(a) {
            console.log(`Your Mass is: ${f / a}`);
            rl.close();
        });
    });
}
function acceleration() {
    rl.question("What is your Force?\n", function(f) {
        rl.question("What is your Mass?\n", function(m) {
            console.log(`Your Acceleration is: ${f / m}`);
            rl.close();
        });
    });
}