////Finished on 9/04/2020
//https://www.reddit.com/r/dailyprogrammer/comments/pu2c0/2172012_challenge_9_difficult/
console.clear();
let s = "1";
for(let i = 2; i<=40; i++) {
    func();
}
console.log(s);
function func() {
    let t = s;
    s = "";
    for(let i = 0; i<t.length;) {
        let reg = new RegExp(t.charAt(i) + "*");
        let x = t.substring(i).match(reg)[0];
        s += x.length + t.charAt(i);
        i += x.length;
    }
}