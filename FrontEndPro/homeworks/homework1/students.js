"use strict";

const petro = {
    age: 55,
    height: 180
};

const victor = {
    age: 59,
    height: 190
};

const vladimir = {
    age: 45,
    height: 170
};

const averageHeight = (petro.height + victor.height + vladimir.height) / 3;

console.log("Petro's height " + petro.height);
console.log("Victor's height " + victor.height);
console.log("Vladimir's height " + vladimir.height);
console.log("Average height of the students: " + averageHeight);


