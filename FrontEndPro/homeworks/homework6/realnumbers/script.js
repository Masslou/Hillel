'use strict';

let number = askNumber();
let result = checkRealNums(number);

function askNumber() {
    let number;

    do {
        number = prompt(`Enter number `);
    } while (
        isNaN(number)
        );

    return number;
}

function checkRealNums(number) {
    number.split('');
    console.log(number)
}

function printResultMessage(result) {
    console.log(`In ${number} is ${result} real number`)
}

