'use strict';


const counter = calculator(10);


function calculator(value) {
    let generalValue = value;

    return {
        add: (argument) => argument + generalValue,
        multiple: (argument) => argument * generalValue,
        divide: (argument) => argument / generalValue,
        sub: (argument) => argument - generalValue,
        set: (argument) => generalValue = argument
    }
}

console.log(counter.add(100)); //110
console.log(counter.multiple(2));
console.log(counter.divide(2));
console.log(counter.sub(10));
console.log(counter.set(10));



