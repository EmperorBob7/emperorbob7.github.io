//Finished on 9/04/2020
//https://www.reddit.com/r/dailyprogrammer/comments/psewf/2162012_challenge_8_intermediate/
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);
const names = [" hundred ", " thousand "];
const basic_nums = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const tens = ["","",'twenty ', 'thirty ', 'forty ', 'fifty ', 'sixty ', 'seventy ', 'eighty ', 'ninety '];
function commaFie(val) {
    while (/(\d+)(\d{3})/.test(val.toString())) {
        val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
    }
    return val;
}
rl.question("Number: ", function (num) {
    let s = commaFie(num);
    let arr = s.split(",");
    let x = 0;
    let print = "";
    console.log(arr);
    for (let i = arr.length - 1; i >= 0; i--) {
        if (parseInt(arr[i]) <= 19) {
            print = basic_nums[parseInt(arr[i])] + "" + names[x] + print;
        } else if (parseInt(arr[i]) <= 99) {
            print = tens[parseInt(arr[i].charAt(0))] + basic_nums[parseInt(arr[i].charAt(1))] + "" + names[x] + print;
        } else if (parseInt(arr[i]) <= 999) {
            print = basic_nums[parseInt(arr[i].charAt(0))] + " hundred " + tens[parseInt(arr[i].charAt(1))] + basic_nums[parseInt(arr[i].charAt(2))] + names[x] + print;
        }
        x++;
    }
    console.log(print.substring(0, print.length-9));
    rl.close();
});