'use strict';

const obj = {name: 'Alex', age: 33, address: {country: 'UA', city: 'Dnipro'}, hello: {a: 'a', b: 'b'}};

const newObject = (copyObj(obj));

console.log(obj, newObject);

function copyObj(objToCopy, objInProgress) {

    let targetObj = objInProgress ? objInProgress : {};
    for (let key in objToCopy) {
        if (typeof objToCopy[key] === 'object') {
            targetObj[key] = {};
            copyObj(objToCopy[key], targetObj[key]);
        } else {
            targetObj[key] = objToCopy[key];
        }
    }
    return targetObj;
}
