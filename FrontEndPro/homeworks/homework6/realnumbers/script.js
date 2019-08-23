'use strict';

let userNumber = askNumber();
let result = findEvenNumbers(userNumber);
printResultMessage(userNumber, result);

function askNumber() {
    let number;

    do {
        number = prompt(`Enter number `);
    } while (
        isNaN(number) ||
        number === null
        );
    return number;
}

function findEvenNumbers(number) {
    let countRealNumbers = 0;
    number.split('');
    for (let i = 0; i < number.length; i++) {
        if (number[i] % 2 === 0) {
            countRealNumbers++;
        }
    }

    return countRealNumbers > 0 ? countRealNumbers : 0;
}

function printResultMessage(userNumber, result) {
    alert(`in ${userNumber} is ${result} even numbers`)
}

