'use strict';


const MIN_VALUE = 0;
const MAX_VALUE = 10;
const CORRECT_ANSWER_POINTS = 10;
let points = 0;

startGame();


function askNumber() {
    let number;
    do {
        number = +prompt(`Enter value between ${MIN_VALUE} and ${MAX_VALUE}: `);
    } while (number < MIN_VALUE
        || number > MAX_VALUE
        || isNaN(number)
        );

    return number;
}

function generateRandomNumber(minValue, maxValue) {
    return Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
}

function summaryPoints(number, randomNumber) {
    return number === randomNumber ? CORRECT_ANSWER_POINTS : null;
}

function informationAlert(number, randomNumber, points) {
    alert(`Your number is : ${number} , program number is: ${randomNumber} Overall result: ${points}`);
}

function askPlayAgain() {
    confirm('Repeat again?') ? startGame() : alert('Have a nice day!');
}

function startGame() {
    let randomNumber = generateRandomNumber(MIN_VALUE, MAX_VALUE);
    let number = askNumber();
    points += summaryPoints(number, randomNumber);
    informationAlert(number, randomNumber, points);
    askPlayAgain();
}


// const obj = {name: 'Alex', age: 33, address: {country: 'UA', city: 'Dnipro'}, hello: {a: 'a', b: 'b'}};
// console.log(copyObj(obj));
//
// function copyObj(objToCopy, targetObj) {
//
//     targetObj = targetObj ? targetObj : {};
//
//     for (let key in objToCopy) {
//         if (typeof objToCopy[key] === 'object') {
//             targetObj[key] = {};
//             copyObj(objToCopy[key], targetObj[key]);
//         }
//             targetObj[key] = objToCopy[key];
//     }
//     return targetObj;
// }
