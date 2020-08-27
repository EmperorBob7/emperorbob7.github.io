//Finished on 8/19/2020
//https://www.reddit.com/r/dailyprogrammer/comments/pniaw/2132012_challenge_5_difficult/
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);
const enemy = {
    hp: 500,
    atk: function () {
        return Math.floor(Math.random() * 100 + 1)
    }
};
const player = {
    hp: 250,
    atkBuff: 1,
    heal: 0,
    atk: function () {
        return Math.floor(Math.random() * 50 + 1) * this.atkBuff;
    },
    buff: function () {
        let x = Math.floor(Math.random() * 2);
        if (x == 0) {
            this.atkBuff += .5;
            return "Atk";
        }
        else {
            this.heal += 50;
            return "Heal";
        }
    }
}
async function game() {
    while (enemy.hp > 0 && player.hp > 0) {
        await turn();
    }
    rl.close();
}
game();
function turn() {
    return new Promise((res, rej) => {
        rl.question("Attack or Buff?\n", function (answer) {
            answer = answer.toLowerCase();
            if (answer == "attack" || answer == "buff") {
                const enemyAttack = enemy.atk();
                let userAttack = 0;
                if (answer == "attack") {
                    userAttack = player.atk();
                } else {
                    console.log(`Player has buffed!\nPlayer has been blessed with ${player.buff()}`);
                }
                player.hp -= enemyAttack;
                player.hp += player.heal;
                console.log(`Enemy has done ${enemyAttack} damage to Player!\nPlayer has ${player.hp} health left.`);
                enemy.hp -= userAttack;
                console.log(`Player has done ${userAttack} damage to Enemy!\nEnemy has ${enemy.hp} health left.\n\n`);
                res(true);
            } else {
                console.log("Bad input");
                res(false);
            }
        });
    });
}