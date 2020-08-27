//Finished on 8/19/2020
//https://www.reddit.com/r/dailyprogrammer/comments/pnhtj/2132012_challenge_5_intermediate/
const fs = require("fs");
const data = fs.readFileSync('./5-2.txt', 'UTF-8');
const lines = data.split(/\r?\n/);
let originals = [];
const t0 = new Date().getTime();

for (let i = 0; i < lines.length; i++) {
    lines[i] = lines[i].split("").sort().join("");
}
let count = 0;
for (let i = 0; i < lines.length; i++) {
    let element = lines[i];
    let element2Index = lines.lastIndexOf(element);
    if (element2Index != i) {
        count++;
        lines.splice(element2Index, 1);
    }
}
const t1 = new Date().getTime();
console.log("Call to 5-2 took " + (t1 - t0) + " milliseconds.");
console.log(count);