////Finished on 9/04/2020
//https://www.reddit.com/r/dailyprogrammer/comments/pu1y6/2172012_challenge_9_intermediate/
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);
const fs = require("fs");
rl.question("Relative Path To Text Filen\n", (path) => {
    if (fs.existsSync(path)) {
        rl.question("Replace Text: ", (replacer) => {
            rl.question("Text to Replace With: ", (replacee) => {
                let text = fs.readFileSync(path, { encoding: "utf8" });
                console.log(text);
                console.log(text.split(replacer).join(replacee));
                rl.close();
            });
        });
    } else {
        console.log("Bad Path.");
        rl.close();
    }
});