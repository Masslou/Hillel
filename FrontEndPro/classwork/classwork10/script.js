'use strict';


const calculator = calculation(10);


function calculation(value) {
    let mainValue = value || 0;

    return {
        add: (argument) => argument + mainValue,
        mult: (argument) => argument *  mainValue,
        divide: (argument) => argument / mainValue,
        sub: (argument) => argument - mainValue,
        set: (argument) => mainValue = argument
    }
}

console.log(calculator.add(100));
console.log(calculator.mult(2));
console.log(calculator.divide(2));
console.log(calculator.sub(10));
console.log(calculator.set(10));



