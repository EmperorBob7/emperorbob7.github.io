let ctx, canvas, interval;
let grid = [[]];
let down;
let ee;
//Elements
const VOID = 0;
const METAL = 1;
const SAND = 2;
const WATER = 3;
const CORONA_BOMB = 4;
const VACCINATE = 5;
const FIRE = 6;
const PERSON = 7;
const INFECTED = 8;

let selected = METAL;
let colors = ["black", "gray", "yellow", "blue", "red", "cyan", "orange", "#d6a594", "purple"];

//Setup Game when page loads
window.onload = function () {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    grid = new Array(50);
    for (let i = 0; i < grid.length; i++) {
        grid[i] = new Array(70);
    }
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[0].length; c++) {
            grid[r][c] = 0;
        }
    }
    canvas.addEventListener("mousedown", mouseDown);
    canvas.addEventListener("mouseup", mouseUp);
    canvas.addEventListener("mousemove", mouseMove);
    canvas.addEventListener("mouseout", mouseOut);
    interval = setInterval(update, 5);
    ctx.fillStyle = colors[METAL];
}
function update() {
    if (down) {
        clicked(ee);
    }
    //Check Grid
    for (let i = 0; i < 5000; i++) {
        let r = Math.floor(Math.random() * grid.length) * 10 / 10;
        let c = Math.floor(Math.random() * grid[0].length) * 10 / 10;
        if (grid[r][c] == SAND && r < grid.length) {
            if (grid[r][c + 1] == VOID) {
                grid[r][c] = VOID;
                grid[r][c + 1] = SAND;
            }
            if (grid[r][c + 1] == WATER) {
                grid[r][c] = WATER;
                grid[r][c + 1] = SAND;
            }
        }
        else if (grid[r][c] == WATER) {
            let random = Math.floor(Math.random() * 3);
            if (random == 0 && r > 0 && (grid[r - 1][c] == VOID || grid[r - 1][c] == FIRE)) {
                grid[r - 1][c] = WATER;
                grid[r][c] = VOID;
            }
            else if (random == 1 && c < grid[0].length && (grid[r][c + 1] == VOID || grid[r][c + 1] == FIRE)) {
                grid[r][c + 1] = WATER;
                grid[r][c] = VOID;
            }
            else if (random == 2 && r < grid.length - 1 && (grid[r + 1][c] == VOID || grid[r + 1][c] == FIRE)) {
                grid[r + 1][c] = WATER;
                grid[r][c] = VOID;
            }
        } else if (grid[r][c] == CORONA_BOMB) {
            for (let i = -3; i <= 3; i++) {
                for (let j = -3; j <= 3; j++) {
                    let x = j + c;
                    let y = i + r;
                    if (y > 0 && y < grid.length && x > 0 && x < grid[0].length) {
                        if (grid[y][x] == PERSON) {
                            let rand = Math.floor(Math.random() * (6 - Math.abs(i) - Math.abs(j)));
                            console.log(rand + "\t" + j + "\t" + i);
                            if(rand >= 2)
                                grid[y][x] = INFECTED;
                        }
                    }
                }
            }
            grid[r][c] = VOID;
        }
    }
    //Update Visuals
    draw();
}
function draw() {
    ctx.fillStyle = colors[0];
    ctx.fillRect(0, 0, grid.length * 10, grid[0].length * 10);
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[0].length; c++) {
            ctx.fillStyle = colors[grid[r][c]];
            ctx.fillRect(r * 10, c * 10, 10, 10);
        }
    }
}
function clicked(e) {
    let rect = canvas.getBoundingClientRect();
    let x = Math.floor((e.clientX - rect.left) / 10) * 10;
    let y = Math.floor((e.clientY - rect.top) / 10) * 10;
    if (x < 0 || x >= 500 || y < 0 || y >= 700) {
        down = false;
        return;
    }
    if (selected == VACCINATE) {
        if (grid[x / 10][y / 10] == PERSON)
            grid[x / 10][y / 10] = selected;
        return;
    }
    if (grid[x / 10][y / 10] != null)
        grid[x / 10][y / 10] = selected;
}
function mouseDown(e) {
    ee = e;
    down = true;
}
function mouseUp(e) {
    down = false;
}
function mouseMove(e) {
    ee = e;
}
function mouseOut(e) {
    down = false;
}
function setElement(element) {
    selected = element;
    ctx.fillStyle = colors[element];
}