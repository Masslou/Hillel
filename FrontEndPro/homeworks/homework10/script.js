'use strict';


const calculator = createCalculator(10);


function createCalculator(value = 0) {
    let mainValue = value;

    return {
        add: (argument) => mainValue += argument,
        multiply: (argument) => mainValue *= argument,
        divide: (argument) => mainValue /= argument,
        subtract: (argument) => mainValue -= argument,
        set: (argument) => mainValue = argument
    }
}

console.log(calculator.add(100)); //110
console.log(calculator.multiply(2)); // 220
console.log(calculator.divide(2)); // 110
console.log(calculator.subtract(10)); // 100
console.log(calculator.set(70)); // 70
console.log(calculator.add(10)); // 80



