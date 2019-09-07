'use strict';

function calculator(value) {
    let generalValue = value;

    return {
        add: (argument) => argument+generalValue,
        multiple: (argument) => argument*generalValue,
        divisor: (argument) => argument/generalValue,
        sub: (argument) => argument-generalValue,
        setValue: (argument) => generalValue = argument
    }
}


const counter = calculator(10);


console.log(counter.add(100)); //110
console.log(counter.multiple(2));
console.log(counter.divisor(2));
console.log(counter.sub(10));
console.log(counter.setValue(10));

