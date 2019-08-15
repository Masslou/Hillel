'use strict';

const MIN_VALUE = 1;
const MAX_VALUE = 10;

startProgram();

function startProgram() {
    console.clear();
    let factor = askFactor();
    doMultiplication(factor);
    askRepeatProgram();
}

function askFactor() {

    let factor = null;

    do {
        factor = +prompt('Enter the factor');
    } while (isNaN(factor) &&
        factor >= MIN_VALUE &&
        factor <= MAX_VALUE
        );

    return factor;
}

function doMultiplication(factor) {

    let result = null;
    let message = '';

    for (let i = 1; i <= 10; i++) {
        result = factor * i;
        message = `${factor} multiply with ${i} will be ${result}`;
        printResult(message);
    }
}

function printResult(result) {
    console.log(result);
}

function askRepeatProgram() {
    confirm('Repeat again?') ? startProgram() : alert('Have a nice day!');
}
