'use strict';

const obj = {name: 'Alex', age: 33, address: {country: 'UA', city: 'Dnipro'}, hello: {a: 'a', b: 'b'}};

const newObject = createCopyObj(obj);

console.log(obj, newObject);

function createCopyObj(userObj) {
    let copyObj = {};
    for (let key in userObj) {

        if (typeof (userObj[key]) === 'object') {
            copyObj[key] = createCopyObj(userObj[key]);
        } else {
            copyObj[key] = userObj[key];
        }
    }
    return copyObj;
}
