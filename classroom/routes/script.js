// let a = "pushpenda";
// let b = " yadav";
// let c = a%b;
// console.log(c);

//let a = [10,32,43,53,53];
//console.log(a.slice(0,3));
//console.log(a.indexOf(53));

let a = " rampushpendra     ";
let b = a.trim();
console.log(a.toUpperCase())
console.log(a.length);
console.log(b.length);

let char = "yadav  pushpenda";
const array = char.split("");
console.log(array.constructor)
console.log(char.indexOf("a",5))
console.log(array.at(9))//Thet at() method returns an indexed character from a string
console.log(array.at(array.length-1))
console.log(char.repeat(3))


const frutis = ["mango","grapesh","banana","apple","pineapple"];
const newfruite = frutis.splice(1,0,"pea","onian");
console.log(frutis)