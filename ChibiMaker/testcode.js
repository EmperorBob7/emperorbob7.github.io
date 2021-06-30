let j = require("./testjson.json");
let x = j.players;
for (let i = 0; i < x.length; i++) {
    console.log(i + " " + x[i].xp);
}