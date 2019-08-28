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
    let splitNumbers = number.split('');
    for (let i = 0; i < splitNumbers.length; i++) {
        if (number[i] % 2 === 0) {
            countRealNumbers++;
        }
    }
    return countRealNumbers;
}

function printResultMessage(userNumber, result) {
    alert(`in ${userNumber} is ${result} even numbers`)
}

