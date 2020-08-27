//Finished on 8/16/2020
//https://www.reddit.com/r/dailyprogrammer/comments/pkwgf/2112012_challenge_3_difficult/
const fs = require('fs');
let or = ['aekmrt', 'aeelsw', 'cddelsu', 'aeggior', 'ellrssu', 'aacilnor', 'denostu', 'aahmrt', 'iknnsy', 'aefiknr'];
let scrambles = ['aekmrt', 'aeelsw', 'cddelsu', 'aeggior', 'ellrssu', 'aacilnor', 'denostu', 'aahmrt', 'iknnsy', 'aefiknr'];
let done = [];
const t0 = new Date().getTime();

function start() {
    try {
        const data = fs.readFileSync('./3-3.txt', 'UTF-8');
        const lines = data.split(/\r?\n/);
        for (let i = 0; i < lines.length; i++) {
            let line = lines[i].split("").sort().join("");
            let x = or.indexOf(line);
            if (x > -1) {
                scrambles.splice(x, 1)[0];
                done[x] = lines[i];
            }
        }
        const t1 = new Date().getTime();
        console.log("Call to start took " + (t1 - t0) + " milliseconds.");
        console.log(done);
    } catch (err) {
        console.log(err);
    }
}
start();