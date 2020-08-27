//Finished on 8/17/2020
//https://www.reddit.com/r/dailyprogrammer/comments/pm7g7/2122012_challange_4_difficult/
const arr = [
    [5, 3, 15],
    [4, 2, 8],
    [6, 2, 12],
    [6, 2, 3],
    [9, 12, 108],
    [4, 16, 64]
];
function maths(arr) {
    let a = arr[0];
    let b = arr[1];
    let c = arr[2];
    if (a + b == c)
        console.log(`${a} + ${b} = ${c}`);
    if (a + c == b)
        console.log(`${a} + ${c} = ${b}`);
    if (b + c == a)
        console.log(`${b} + ${c} = ${a}`);
    if (a - b == c)
        console.log(`${a} - ${b} = ${c}`);
    if (a - c == b)
        console.log(`${a} - ${c} = ${b}`);
    if (b - c == a)
        console.log(`${b} - ${c} = ${a}`);
    if (b - a == c)
        console.log(`${b} - ${a} = ${c}`);
    if (c - a == b)
        console.log(`${c} - ${a} = ${b}`);
    if (c - b == a)
        console.log(`${c} - ${b} = ${a}`);
    if (a * b == c)
        console.log(`${a} * ${b} = ${c}`);
    if (a * c == b)
        console.log(`${a} * ${c} = ${b}`);
    if (b * c == a)
        console.log(`${b} * ${c} = ${a}`);
    if (Math.floor(a / b) == c)
        console.log(`${a} / ${b} = ${c}`);
    if (Math.floor(a / c) == b)
        console.log(`${a} / ${c} = ${b}`);
    if (Math.floor(b / c) == a)
        console.log(`${b} / ${c} = ${a}`);
    if (Math.floor(b / a) == c)
        console.log(`${b} / ${a} = ${c}`);
    if (Math.floor(c / a) == b)
        console.log(`${c} / ${a} = ${b}`);
    if (Math.floor(c / b) == a)
        console.log(`${c} / ${b} = ${a}`);
    console.log("\n");
}
arr.forEach((x) => maths(x));