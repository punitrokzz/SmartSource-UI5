let stpr = 2000;
let min = stpr - stpr*0.05;
let max = stpr + stpr*0.15;

let randomNum = Math.random() * (max - min) + min;

console.log(Math.floor(randomNum));