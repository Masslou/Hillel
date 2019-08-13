'use strict';

let factor = null;

startProgram();

function startProgram() {
    console.clear();
    askFactor();
    doMultiplication(factor);
    askRepeatProgram();
}

function askFactor() {
    const MIN_VALUE = 1;
    const MAX_VALUE = 11;

    do {
        factor = +prompt('Enter the factor');
    } while (isNaN(factor) &&
        factor >= MIN_VALUE &&
        factor < MAX_VALUE
        );
}

function doMultiplication(factor) {

    const MIN_VALUE = 1;
    const MAX_VALUE = 11;

    let result = null;
    let message = '';
    for (let i = MIN_VALUE; i < MAX_VALUE; i++) {
        result = factor * i;
        message = factor + ' multiply with ' + i + ' will be ' + result;
        printResult(message);
    }
}

function printResult(result) {
    console.log(result);
}

function askRepeatProgram() {
    confirm('Repeat again?') ? startProgram() : alert('Have a nice day!');
}
