//Finished on 8/14/2020
//https://www.reddit.com/r/dailyprogrammer/comments/pjbuj/intermediate_challenge_2/
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);
/*
"room2": {
    "N": "",
    "S": "room1",
    "E": "",
    "W": ""
}
*/
const deaths = {
    "cliff": "You fall into the pits of a dark abyss and will not be seen again",
    "lava": "You fall into a pit of lava... Death by burning",
    "prison": "The door suddenly swings closed and cold air leaks into the chamber",
    "ramp": "As you are sliding down, you suddenly find yourself in a tree. You freeze to death.",
    "grass": "As you walk all the way down, you suddenly feel a knife fly into you. You hear the number 8 as you die...",
    "spear": "As you are climbing down you hear a boom in the distance, and feel a spear in your gut.",
    "noose": "Death by hanging",
    "knife": "You pull the lever and see a knife go flying and hit someone who came from room 6. You shortly die from the shock of killing someone.",
    "key": "You go in the room and discover a key. You are able to collect it and exit without dying."
};
const maps = {"room1":{"N":"room2","S":"A Cliff With No Bottom, cliff","E":"A Pit Of Lava, lava","W":"Treasure"},"room2":{"N":"A prison cell, prison","S":"room1","E":"room3","W":"A prison cell, prison"},"room3":{"N":"Treasure","S":"A Cliff With No Bottom, cliff","E":"room4","W":"room2"},"room4":{"N":"A ramp that you might be able to slide down!, ramp","S":"room5","E":"Treasure","W":"room3"},"room5":{"N":"room4","S":"room6","E":"Treasure","W":"A Cliff With No Bottom, cliff"},"room6":{"N":"room5","S":"room7","E":"A staircase that leads to a grassy field, grass","W":"A ladder that leads to solid ground, spear"},"room7":{"N":"room6","S":"room11","E":"room8","W":"A rope for you to climb down, noose"},"room8":{"N":"A prison cell, prison","S":"A prison cell, prison","E":"room9","W":"room7"},"room9":{"N":"A prison cell with a broken lock, key","S":"A prison cell, prison","E":"room10","W":"room8"},"room10":{"N":"Treasure","S":"Treasure","E":"Treasure","W":"room9"},"room11":{"N":"room7","S":"A prison cell, prison","E":"A prison cell, prison","W":"room12"},"room12":{"N":"Treasure","S":"room13","E":"room11","W":"A prison cell, prison"},"room13":{"N":"room12","S":"room14","E":"A prison cell, prison","W":"A prison cell, prison"},"room14":{"N":"room13","S":"room15","E":"A prison cell, prison","W":"Treasure"},"room15":{"N":"room14","S":"room17","E":"Treasure","W":"A prison cell, prison"},"room17":{"N":"room15","E":"room15","S":"room15","W":"finished"}};
let current = "room1";
let money = 0;
let moves = 0;
let hasKey = false;
const reg = /(N|S|E|W)/;

async function start() {
    console.clear();
    console.log("You are in a cold mansion in the mountains, you must follow a certain path if you wish to survive... Good luck\n");
    console.log("Type N, S, E, or W to move");
    let t = true;
    while (t) {
        t = await turn();
    }
}
function turn() {
    return new Promise((res) => {
        moves++;
        rl.question(logRoom(current), function (input) {
            if (!reg.test(input)) {
                console.log("Your input was invalid, please enter N, S, E, or W to move.");
                res(true);
            } else {
                input = input.substring(0, 1);
                console.clear();
                if (maps[current][input] == "Treasure") {
                    let x = treasure();
                    money += x;
                    console.log(`You have earned ${x} tokens! You have ${money} in total!`);
                    maps[current][input] = "A noose for those that are greedy, noose";
                    res(true);
                } else if (!(/room\d+/).test(maps[current][input]) && maps[current][input] != "finished") {
                    if (maps[current][input].split(", ")[1] == "key") {
                        hasKey = true;
                        console.log("You got the key!!");
                        res(true);
                    } else {
                        console.log(deaths[maps[current][input].split(", ")[1]]);
                        console.log("Player has died with " + money + " tokens");
                        rl.close();
                        res(false);
                    }
                } else if (maps[current][input] == "finished") {
                    if (!hasKey) {
                        console.log("You must have the key and at least 54 tokens to go through!");
                        res(true);
                    } else {
                        money -= 54;
                        console.log("Congrats you have beat the game!");
                        console.log(`Player has beaten the game in ${moves} moves with ${money} tokens`);
                        console.log("I wonder if you found the secret of room 8 and the missing room 16");
                        rl.close();
                        res(false);
                    }
                } else {
                    current = maps[current][input];
                    res(true);
                }
            }
        });
    });
}
function logRoom(id) {
    let s = "You are in " + id + "\n\n";
    s += "To the North is " + maps[id].N.split(", ")[0] + "\n";
    s += "To the South is " + maps[id].S.split(", ")[0] + "\n";
    s += "To the East is " + maps[id].E.split(", ")[0] + "\n";
    s += "To the West is " + maps[id].W.split(", ")[0] + "\n";
    return s;
}
function treasure() {
    return Math.floor(Math.random() * 5 + 5);
}
start();