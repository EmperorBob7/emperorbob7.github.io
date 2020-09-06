////Finished on 9/05/2020
//https://www.reddit.com/r/dailyprogrammer/comments/pv98f/2182012_challenge_10_easy/
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);
const reg1 = /\d{10}/;
const reg2 = /\d{3}\-\d{3}\-\d{4}/;
const reg3 = /\d{3}\.\d{3}\.\d{4}/;
const reg4 = /\(\d{3}\)\s?\d{3}-\d{4}/;
const reg5 = /\d{3}\-\d{4}/;
rl.question("Enter a phone number: ", (number) => {
    if (reg1.test(number) || reg2.test(number) || reg3.test(number) || reg4.test(number) || reg5.test(number))
        console.log("Valid!");
    else
        console.log("Invalid");
    rl.close();
});