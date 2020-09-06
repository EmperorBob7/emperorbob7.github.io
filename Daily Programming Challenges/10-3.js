////Finished on 9/05/2020
//https://www.reddit.com/r/dailyprogrammer/comments/pv92x/2182012_challenge_10_difficult/
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);
const words = ["osamu","chika","yuma","jin","hyuse","wakamura","katori","miura","ema","kageura","kitazoe","ninomiya","inukai","tsuji"];
let word = words[Math.floor(Math.random() * words.length)];
let player = word.replace(/./g,"_");
let counter = 7;
async function game() {
    console.log("You can only get it wrong 7 times!");
    while(player != word) {
        console.log(player);
        let x = await turn();
        stuff(x);
        if(counter <= 0) {
            console.log("You lose!");
            console.log("Word was " + word);
            rl.close();
            return;
        }
    }
    console.log("You got it right!");
    console.log("Word was " + word);
    rl.close();
}
function turn() {
    return new Promise((res) => {
        rl.question("Enter a character: ", (guess) => {
            if(guess != undefined)
                res(guess.charAt(0));
            else
                res("a");
        });
    });
}
function stuff(char) {
    let bool = true;
    for(let i = 0; i<word.length; i++) {
        if(word.charAt(i) == char) {
            bool = false;
            player = player.substring(0, i) + char + player.substring(i+1);
        }
    }
    if(bool) {
        console.log(char + " was not right!");
        counter--;
        console.log(counter + " lives remaining");
    }
}
game();