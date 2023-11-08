let strA = "123";
let numA = parseInt(strA);
console.log(numA); // 123

let strB = "3.14";
let numB = parseFloat(strB);
console.log(numB); // 3.14

let strC = "3.14159";
let numC = parseFloat(strC);
let result = numC.toFixed(2);
console.log(result); // "3.14"

let numD = 123;
let strD = numD.toString();
console.log(strD); // "123"

let numE = 123;
let strE = String(numE);
console.log(strE); // "123"
