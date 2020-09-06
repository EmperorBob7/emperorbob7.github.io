////Finished on 9/04/2020
//https://www.reddit.com/r/dailyprogrammer/comments/psf4n/2162012_challenge_8_difficult/
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);
let tri;
function createPascalTriangle(numRows) {
    var pascalTriangle = [];
    for (var i = 0; i < numRows; i++) {
        pascalTriangle[i] = new Array(i + 1);
        for (var j = 0; j < i + 1; j++) {
            if (j === 0 || j === i) {
                pascalTriangle[i][j] = 1;
            } else {
                pascalTriangle[i][j] = pascalTriangle[i - 1][j - 1] + pascalTriangle[i - 1][j];
            }
        }
    }
    tri = pascalTriangle;
}
createPascalTriangle(100);
rl.question("Enter coordinates, Row Index (100 row limit)\n", function(coords) {
    coords = coords.split(" ");
    const row = coords[0];
    const i = coords[1];
    let x = tri[row][i];
    if(x) {
        console.log(x);
    } else {
        console.log("ILL");
    }
    rl.close();
});