'use strict';

const questions = {
    questionOne: 'Choose char thar i have to find: ',
    questionTwo: 'Choose char thar i have to replace: '
};

let text = checkUserText();
let firstChar = checkUserChar(questions.questionOne);
let secondChar = checkUserChar(questions.questionTwo);
let result = replaceAll(text, firstChar, secondChar);
showResult(result);


function checkUserText() {
    let userText;

    do {
        userText = String(prompt('Write your text', 'Hello world'));
    }
    while (
        userText == null ||
        userText.length === 0
        );

    return userText;
}

function checkUserChar(message) {

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
