const hps = {
    1: 0,
    2: 0,
    3: 0,
    4: 0
};
const init = {
    1: 0,
    2: 0,
    3: 0,
    4: 0
};
const action = {
    1: 0,
    2: 0,
    3: 0,
    4: 0
};
const movementAction = {
    1: 0,
    2: 0,
    3: 0,
    4: 0
};
let refreshData = {
    1: "",
    2: "",
    3: "",
    4: ""
};
const trionArr = [100, 200, 400, 800, 1600, 3200, 6400, 12800, 25600];
function setTrion(player) {
    const val = parseInt(document.getElementById("p" + player + "trion").value);
    if (val < 0) {
        document.getElementById("p" + player + "trion").value = 0;
        return;
    } else if (val > 58) {
        document.getElementById("p" + player + "trion").value = 58;
        return;
    }
    hps[player] = val;
    updateDisplay();
}
function setInit(player) {
    const val = parseInt(document.getElementById("p" + player + "init").value);
    if (val < 0) {
        document.getElementById("p" + player + "init").value = 0;
        return;
    } else if (val > 15) {
        document.getElementById("p" + player + "init").value = 15;
        return;
    }
    init[player] = val;
    updateDisplay();
}
function setAction(player) {
    const val = parseInt(document.getElementById("p" + player + "action").value);
    if (val < 0) {
        document.getElementById("p" + player + "action").value = 0;
        return;
    } else if (val > 10) {
        document.getElementById("p" + player + "action").value = 10;
        return;
    }
    action[player] = val;
    updateDisplay();
}
function setMovementAction(player) {
    const val = parseInt(document.getElementById("p" + player + "movementaction").value);
    if (val < 0) {
        document.getElementById("p" + player + "movementaction").value = 0;
        return;
    } else if (val > 4) {
        document.getElementById("p" + player + "movementaction").value = 4;
        return;
    }
    movementAction[player] = val;
    updateDisplay();
}
function addDamage(player) {
    hps[player] -= document.getElementById(`p${player}Damage`).value;
    updateDisplay();
}
function updateDisplay() {
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`p${i}TrionDisplay`).innerText = "HP: " + hps[i];
        document.getElementById(`p${i}InitDisplay`).innerText = "Initiative: " + init[i];
        document.getElementById(`p${i}ActionDisplay`).innerText = "Action: " + (action[i] + movementAction[i]);
        document.getElementById(`p${i}MovementActionDisplay`).innerText = "Movement: " + movementAction[i];
    }
}
function refresh() {
    if (confirm("If You Have Not Saved All Data, It Will Not Be There When You \"Refresh\", Do You Wish To Proceed?")) {
        for (let i = 1; i <= 4; i++) {
            const arr = refreshData[i].split(" ");
            document.getElementById(`p${i}trion`).value = parseInt(arr[0]);
            setTrion(i);
            document.getElementById(`p${i}init`).value = parseInt(arr[1]);
            setInit(i);
            document.getElementById(`p${i}action`).value = parseInt(arr[2]);
            setAction(i);
            document.getElementById(`p${i}movementaction`).value = parseInt(arr[3]);
            setMovementAction(i);
        }
        message("Refreshed Successfully");
    }
    else
        message("Refresh Cancelled");
}
function saveData() {
    for (let i = 1; i <= 4; i++) {
        refreshData[i] = hps[i] + " ";
        refreshData[i] += init[i] + " ";
        refreshData[i] += action[i] + " ";
        refreshData[i] += movementAction[i];
    }
    message("Data Saved Successfully");
}
function message(str) {
    //document.getElementById("systemMessages").innerText = str;
}
function resetInitiative(player) {
    document.getElementById(`p${player}init`).value = parseInt(refreshData[player].split(" ")[1]);
    setInit(player);
}
function resetAction(player) {
    document.getElementById(`p${player}action`).value = parseInt(refreshData[player].split(" ")[2]);
    setAction(player);
}
function diceRoll() {
    const max = document.getElementById("rollMax").value;
    document.getElementById("roll").innerText = "Rolled: " + (Math.floor(Math.random() * max) + 1);
}