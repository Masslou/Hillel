'use strict';


const calculator = calculation(10);


function calculation(value) {
    let mainValue = value || 0;
    return {
        add: (argument) => mainValue + argument,
        multiply: (argument) => mainValue * argument,
        divide: (argument) => mainValue / argument,
        subtract: (argument) => mainValue - argument,
        set: (argument) => mainValue = argument
    }
}

console.log(calculator.add(100)); //110
console.log(calculator.multiply(2)); // 20
console.log(calculator.divide(2)); // 5
console.log(calculator.subtract(10)); // 0
console.log(calculator.set(70)); // 10
console.log(calculator.add(10)); // 80



