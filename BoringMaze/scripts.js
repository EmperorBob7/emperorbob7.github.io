if (localStorage.getItem("firstTime") == null) {
    localStorage.setItem("firstTime", "done");
    alert("You may want to zoom in ~130%.");
}
const storage = {
    "fakeGrass": true,
    "firstTime": false,
    "interacted": false,
    "button1": true,
    "fakePath": true,
    "newPath": true,
    "button2": true,
    "button3": true
};
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let image, victory;
const logger = document.getElementById("console");

//Sounds
const success = new Audio('./audio/success.mp3');
success.volume = 0.5;
success.currentTime = .5;
const eternaForest = new Audio('./audio/eternaForest.mp3');
eternaForest.volume = 0.2;
eternaForest.loop = true;

class Sprite {
    constructor(x, y, canCollide) {
        this.buffer = document.createElement("canvas");
        this.buffer.width = 16;
        this.buffer.height = 16;
        this.ctx = this.buffer.getContext("2d");
        this.ctx.drawImage(image, x, y, 16, 16, 0, 0, 16, 16);
        this.canCollide = canCollide;
    }
    draw(x, y) {
        ctx.drawImage(this.buffer, x, y);
    }
}
function loadSheet(src) {
    return new Promise(res => {
        let img = new Image();
        img.addEventListener("load", () => {
            res(img);
        });
        img.src = src;
    });
}
const playerCoords = {
    x: 10,
    y: 19
};
let player;
let map = [
    ["s1", "s2", "s3", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr"],
    ["s4", "s5", "s6", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr"],
    ["s7", "s8", "s9", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr"],
    ["gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr"],
    ["gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr"],
    ["gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr"],
    ["gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr"],
    ["gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr"],
    ["gr", "gr", "gr", "gr", "gr", "gr", "gr", "b1", "b1", "b1", "b1", "b1", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr"],
    ["gr", "gr", "gr", "gr", "gr", "gr", "gr", "b1", "w1", "w2", "w3", "b1", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr"],
    ["gr", "gr", "gr", "gr", "gr", "gr", "gr", "b1", "w4", "fw", "w6", "b1", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr"],
    ["gr", "gr", "gr", "gr", "gr", "gr", "gr", "b1", "w4", "w5", "w6", "b1", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr"],
    ["gr", "gr", "gr", "gr", "gr", "gr", "gr", "b1", "w4", "w5", "w6", "b1", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr"],
    ["gr", "gr", "gr", "gr", "gr", "gr", "gr", "b1", "w4", "w5", "w6", "b1", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr"],
    ["gr", "gr", "gr", "gr", "gr", "gr", "gr", "b1", "w4", "w5", "w6", "b1", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr"],
    ["gr", "gr", "gr", "gr", "gr", "gr", "gr", "b1", "w4", "w5", "w6", "b1", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr"],
    ["gr", "gr", "gr", "gr", "gr", "gr", "gr", "b1", "w4", "w8", "w9", "b1", "t1", "t2", "gr", "gr", "gr", "gr", "gr", "gr"],
    ["gr", "gr", "gr", "gr", "gr", "gr", "gr", "b1", "g2", "g2", "g2", "g2", "t3", "t4", "b1", "g2", "g2", "b1", "g2", "g2"],
    ["gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "g2", "gr", "gr", "gr", "g2", "gr", "gr", "gr", "gr", "gr", "gr", "gr"],
    ["gr", "gr", "gr", "gr", "gr", "gr", "gr", "gr", "g2", "gr", "gr", "gr", "g3", "gr", "gr", "gr", "gr", "gr", "gr", "sw"],
];

const spriteMap = {};
loadSheet("./images/victory.png").then(img => {
    victory = img;
});
loadSheet("./images/SpriteSheet.png").then(img => {
    image = img;
    fetch('./tileMap.json')
        .then(response => response.json())
        .then(obj => {
            for (let x in obj) {
                spriteMap[x] = new Sprite(obj[x].x * 16, obj[x].y * 16, obj[x].canCollide);
            }
            player = new Sprite(obj["pl"].x * 16, obj["pl"].y * 16);
            drawMap();
            player.draw(playerCoords.x * 16, playerCoords.y * 16);
            log("Welcome to Boring Maze! There is definitely not any weird mechanics in this game. Good luck getting to the end (WASD).");
        });
});
const validKeys = ["KeyW", "KeyS", "KeyA", "KeyD"];
document.addEventListener("keydown", keyDown);

function keyDown(key) {
    if (!storage["interacted"]) {
        storage["interacted"] = true;
        eternaForest.play();
    }
    if (!validKeys.includes(key.code))
        return;
    spriteMap[map[playerCoords.y][playerCoords.x]].draw(playerCoords.x * 16, playerCoords.y * 16);
    switch (key.code) {
        case "KeyW":
            if (playerCoords.y > 0 && spriteMap[map[playerCoords.y - 1][playerCoords.x]].canCollide !== false)
                playerCoords.y--;
            break;
        case "KeyS":
            if (playerCoords.y < map.length - 1 && spriteMap[map[playerCoords.y + 1][playerCoords.x]].canCollide !== false)
                playerCoords.y++;
            break;
        case "KeyA":
            if (playerCoords.x > 0 && spriteMap[map[playerCoords.y][playerCoords.x - 1]].canCollide !== false)
                playerCoords.x--;
            break;
        case "KeyD":
            if (playerCoords.x < map.length - 1 && spriteMap[map[playerCoords.y][playerCoords.x + 1]].canCollide !== false)
                playerCoords.x++;
            break;
    }
    if (storage["fakeGrass"] && playerCoords.y == 19 && playerCoords.x == 12) {
        log("Congrats on finding the fake grass.");
        storage["fakeGrass"] =  false;
        accomplishment();
    }
    if (storage["button1"] && playerCoords.y == 19 && playerCoords.x == 19) {
        log("Maybe something changed somewhere else.");
        storage["button1"] = false;
        accomplishment();
        map[17][9] = "g3";
    }
    if (storage["fakePath"] && playerCoords.y == 10 && playerCoords.x == 9) {
        log("I wonder if you stumbled upon this by accident.")
        storage["fakePath"] = false;
        accomplishment();
        map[13][7] = "gr";
        drawMap(13, 14, 7, 8);
    }
    if(storage["newPath"] && playerCoords.y == 13 && playerCoords.x == 6) {
        log("Lol you thought we were done?");
        storage["newPath"] = false;
        map[13][7] = "b1";
        for(let i = 0; i<=7; i++) {
            map[12][i] = "b1";
        }
        map[18][7] = "b1";
        map[19][7] = "b1";
        map[16][0] = "sw";
        drawMap(12, 20, 0, 8);
    }
    if(storage["button2"] && playerCoords.y == 16 && playerCoords.x == 0) {
        log("Remember the first task?");
        accomplishment();
        map[18][7] = "gr";
        map[19][7] = "gr";
        map[19][8] = "g3";
        map[9][11] = "gr";
        for(let i = 0; i<8; i++) {
            map[i][11] = "b1";
        }
        for(let i = 10; i<20; i++) {
            map[9][i] = "w5";
        }
        map[9][19] = "sw";
        drawMap();
        storage["button2"] = false;
    }
    if(storage["button3"] && playerCoords.y == 9 && playerCoords.x == 19) {
        playerCoords.x = 0;
        log("Now get to the end!");
        accomplishment();
        storage["button3"] = false;
    }
    if(playerCoords.y == 2 && playerCoords.x == 1) {
        ctx.drawImage(victory, 0, 0, 320, 320);
        document.removeEventListener("keydown", keyDown);
        log("Lmao this game sucked, thanks for playing it though!");
    }
    player.draw(playerCoords.x * 16, playerCoords.y * 16);
}

function drawMap(i = 0, maxI = map.length, j = 0, maxJ = map[i].length) {
    for (; i < maxI; i++) {
        for (j = 0; j < maxJ; j++) {
            spriteMap[map[i][j]].draw(j * 16, i * 16);
        }
    }
}

function log(txt) {
    logger.innerText = txt;
}

function accomplishment() {
    eternaForest.pause();
    success.currentTime = .5;
    success.play();
}

success.addEventListener("ended", () => {
    eternaForest.play();
});