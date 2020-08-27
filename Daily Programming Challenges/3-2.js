//Finished on 8/16/2020
//https://www.reddit.com/r/dailyprogrammer/comments/pkwb1/2112012_challenge_3_intermediate/
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);
const map = {"a":"b", "b":"v", "c":"g", "d":"q", "e":"k", "f":"m", "g":"n", "h":"a", "i":"d", "j":"z", "k":"c", "l":"w", "m":"s", "n":"e", "o":"o", "p":"y", "q":"f", "r":"j", "s":"x", "t":"h", "u":"t", "v":"l", "w":"p", "x":"u", "y":"i", "z":"r"};

rl.question("Enter text to encrypt: ", function(text) {
    let s = "";
    for(let char of text) {
        if(!/[a-zA-Z]/.test(char)) {
            s += char;
            continue;
        }
        if(char.toLowerCase() == char) {
            s += map[char];
        } else {
            s += map[char.toLowerCase()].toUpperCase();
        }
    }
    console.log(s);
    rl.close();
});