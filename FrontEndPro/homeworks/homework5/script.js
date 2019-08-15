'use strict';

const questions = {
    messageFirstChar: 'Choose char thar i have to find: ',
    messageSecondChar: 'Choose char thar i have to replace: '
};

let text = askUserText();
let firstChar = askUserChar(questions.messageFirstChar);
let secondChar = askUserChar(questions.messageSecondChar);
let result = replaceAll(text, firstChar, secondChar);
showResult(result);


function askUserText() {
    let userText = null;

    do {
        userText = String(prompt('Write your text', 'Hello world'));
    }
    while (
        userText == null ||
        userText.length === 0
        );

    return userText;
}

function askUserChar(message) { 

    let userChar = null;

    do {
        userChar = String(prompt(message));
    }
    while (
        userChar == null ||
        userChar.length > 1 ||
        userChar.length === 0
        );

    return userChar;
}

function replaceAll(str, firstChar, secondChar) {

    str = str.toLowerCase();
    let newString = str.replace(firstChar, secondChar);

    return newString.indexOf(firstChar) >= 0 ? replaceAll(newString, firstChar, secondChar) : newString;
}

function showResult(result) {
    alert(`Result of replace: ${result}`);
}
