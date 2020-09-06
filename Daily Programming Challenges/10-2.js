////Finished on 9/05/2020
//https://www.reddit.com/r/dailyprogrammer/comments/pv8zm/2182012_challenge_10_intermediate/
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);
const T2W = require('numbers2words');
const translator = new T2W("EN_US");
const opArr = {
    "+": "plus",
    "-": "minus",
    "*": "times",
    "/": "divide"
};

rl.question("Enter an equation with no spaces: ", (e1) => {
    rl.question("Enter another equation with no spaces: ", (e2) => {
        let arr1 = e1.match(/\d+/g);
        let arr2 = e2.match(/\d+/g);
        let oper1 = e1.match(/[^\d]/);
        let oper2 = e2.match(/[^\d]/);
        let s1 = translator.toWords(parseInt(arr1[0])) + translator.toWords(parseInt(arr1[1])) + opArr[oper1];
        let s2 = translator.toWords(parseInt(arr2[0])) + translator.toWords(parseInt(arr2[1])) + opArr[oper2];
        console.log(s1);
        console.log(s2);
        s1 = s1.split("").sort().join("");
        s2 = s2.split("").sort().join("");
        console.log(s1 == s2);
        rl.close();
    });
});