//Finished on 8/16/2020
//https://www.reddit.com/r/dailyprogrammer/comments/pkw2m/2112012_challenge_3_easy/
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

rl.question("Encrypt or Decrypt?\n", function (inp) {
    rl.question("Enter Text: ", function (text) {
        rl.question("Shift By?\n", function (shift) {
            inp = inp.toLowerCase();
            if (inp == "encrypt") {
                encrypt(text, parseInt(shift));
            } else if (inp == "decrypt") {
                decrypt(text, parseInt(shift));
            }
        });
    });
});
function encrypt(text, shift) {
    let cypher = "";
    for (let i = 0; i < text.length; i++) {
        let x = text.charCodeAt(i);
        if (x >= 97 && x <= 122) {
            cypher += String.fromCharCode(((x + shift - 97) % 26) + 97);
        } else if (x >= 65 && x <= 90) {
            cypher += String.fromCharCode(((x + shift - 65) % 26) + 65);
        } else {
            cypher += str[i];
        }
    }
    console.log(cypher);
    rl.close();
}
function decrypt(text, shift) {
    let cypher = "";
    for (let i = 0; i < text.length; i++) {
        let x = text.charCodeAt(i);
        if (x >= 97 && x <= 122) {
            cypher += String.fromCharCode(((x - shift - 97 + 26) % 26) + 97);
        } else if (x >= 65 && x <= 90) {
            cypher += String.fromCharCode(((x - shift - 65 + 26) % 26) + 65);
        } else {
            cypher += str[i];
        }
    }
    console.log(cypher);
    rl.close();
}