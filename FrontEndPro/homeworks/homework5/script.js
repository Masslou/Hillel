'use strict';

/*
функция ReplaceAll
Написать функцию replaceAll, чтобы ее можно было использовать следующим образом



replaceAll('Hello world', 'l', 'z'); // функция должна вернуть Hezzo worzd



функция должна проверять что второй и третий аргументы имеют только один символ и если это не так, сообщать об этом
*/
let text = 'Hello world';
let firstChar = 'l';
let secondChar = 'z';
let result = replaceAll(text, firstChar, secondChar);

//
// do{
//
// }
// while(!(typeof (text) === 'string'
//         && typeof (firstChar) === 'string'
//         && typeof (secondChar) === 'string'
//         && firstChar.length > 1
//         && secondChar.length > 1));


function replaceAll(str, firstChar, secondChar) {
debugger;
    str = str.toLowerCase();
    let index = str.indexOf(firstChar);
    let newString = str.replace(firstChar, secondChar);


    if (index >= 0) {

        replaceAll(newString, firstChar, secondChar);
    }


    return newString;



}




