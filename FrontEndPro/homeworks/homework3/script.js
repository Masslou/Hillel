'use strict';

let factor = null;
askFactor();
doMultiplication(factor);
askRepeatProgram();

function askFactor() {

    do {
        factor = +prompt('Enter the factor');
    } while (isNaN(factor) && factor > 0 && factor < 11);

}

function doMultiplication(factor) {
    const MIN_VALUE = 1;
    const MAX_VALUE = 11;

    let result = null;
    let message = '';
    for (let i = MIN_VALUE; i < MAX_VALUE; i++) {
        result = factor * i;
        message = factor + ' multiply with ' + i + ' will be ' + result;

        printResult(message)
    }
}

function printResult(result) {
    console.log(result);
}

function askRepeatProgram() {
    do {
        console.clear();
        askFactor();
        doMultiplication(factor);

    } while (confirm('Repeat again'));

    alert('Have a nice day!')

}
