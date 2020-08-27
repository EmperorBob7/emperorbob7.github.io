//Finished on 8/20/2020
//https://www.reddit.com/r/dailyprogrammer/comments/pp7vo/2142012_challenge_6_difficult/
//Leaving your opponent staring at any of these configurations while he has the move is a win for you: 2-2, 3-3, 4-4, 5-5, 1-1-1, 1-2-3, 1-4-5, 2-2-4, 2-4-6, 2-5-7, 3-4-7 or 3-5-6
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

let rows = [3, 5, 7];
let rowSum = 15;
const MAX = 3;
let currentTurn = 1;
const regExArr = [/(220|022|202)/, /(240|204|024|042|420|402)/, /(330|033|303)/, /(550|055|505)/, /111/, /(123|132|321|312|213|231)/, /(145|154|541|514|415|451)/, /(224|422|242)/, /(246|264|642|624|426|462)/, /(257|275|725|752|527|572)/, /(347|374|743|734|437|473)/, /(356|365|653|635|536|563)/, /(001|100|010)/];

async function game() {
    console.clear();
    while (getSum() != 1) {
        console.log(rows);
        let x = await turn();
        console.log("Move was " + x);
        rows[parseInt(x.charAt(0))] -= parseInt(x.charAt(1));
    }
    if(currentTurn == -1)
        console.log("Bot Wins!");
    else
        console.log("Player WIns!");
    rl.close();
}
function turn() {
    return new Promise((res) => {
        if (currentTurn == 1) { //Bots Turn
            console.log("Bot's Turn");
            let x = toString(rows);
            let ret = "";
            //Test with -1, -2, -3 on all 3 groups!
            for (let i = 0; i < 3; i++) {
                if (ret != "")
                    break;
                for (let j = 1; j <= 3; j++) {
                    if (ret != "")
                        break;
                    if(rows[i] - j < 0)
                        break;
                    let s = rows.slice(0);
                    s[i] -= j;
                    let string2 = toString(s);
                    for (let tt = 0; tt < regExArr.length; tt++) {
                        //console.log(string2);
                        if (regExArr[tt].test(string2)) {
                            ret = ("" + i + j);
                            break;
                        }
                    }
                }
            }
            if (ret == "") {
                console.log("DEFAULT");
                if (rows[0] > 0)
                    res("01");
                else if (rows[1] > 0)
                    res("11");
                else
                    res("21");
            } else {
                res(ret);
            }
            currentTurn = -1;
        } else { //Players Turn
            console.log("Player's Turn");
            currentTurn = 1;
            rl.question("Enter your move in format XY where X is the row you're removing from and Y is the amount removed(max of 3)\n", (input) => {
                input = input.substring(0, 2);
                input = parseInt(input.charAt(0)) - 1 + input.charAt(1);
                if (/[0-2][1-3]/.test(input)) {
                    if (rows[parseInt(input.charAt(0))] - parseInt(input.charAt(1)) < 0) {
                        console.log("There is not enough to remove in this row!");
                        if (rows[0] != 0)
                            res("01");
                        else if (rows[1] != 0)
                            res("11");
                        else
                            res("21");
                    } else {
                        res(input);
                    }
                } else {
                    console.log("You are a stupid chungus");
                    if (rows[0] != 0)
                        res("01");
                    else if (rows[1] != 0)
                        res("11");
                    else
                        res("21");
                }
            });
        }
    });
}
function getSum() {
    return rows[0] + rows[1] + rows[2];
}
function toString(x) {
    return "" + x[0] + x[1] + x[2];
}
game();