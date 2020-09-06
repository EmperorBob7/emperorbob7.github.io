//Finished on 9/04/2020
//https://www.reddit.com/r/dailyprogrammer/comments/pserp/2162012_challenge_8_easy/
function start() {
    let s = "";
    for(let i = 99; i>0;) {
        s += `${i} bottles of beer on the wall, ${i} bottles of beer. Take one down pass it around, ${--i} bottles of beer on the wall. `;
    }
    s += "You are broke now";
    console.log(s);
}
start();