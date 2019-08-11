'use strict';

function sayHello(name) {
    console.warn('Hello ' + name);

    return true;

}

sayHello('Alex');


function concatenate(str1, str2) {
    return String(str1) + String(str2);
}


const result = concatenate('куку1', 'куку2');

console.log(result);