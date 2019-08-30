'use strict';


numeratorRunner();

function numeratorRunner() {
    const userName = askUserName();
    const userNumbers = askUserNumbers();
    const numbersArray = userNumbers.split(',').map(Number);
    const greetingsElm = document.getElementById('greeting');
    const maxElm = document.getElementById('max');
    const minElm = document.getElementById('min');
    checkUserAnswer(numbersArray) ?
        pasteResult(userName, userNumbers, numbersArray, maxElm, minElm, greetingsElm) : pasteErrorMessage(maxElm, minElm);
}

function askUserName() {
    let userText = null;

    do {
        userText = String(prompt('Enter your name', 'No Name'));
    }
    while (
        userText == null ||
        userText.length === 0
        );

    return userText;
}

function askUserNumbers() {
    return String(prompt('Enter numbers with a comma', '9, 0, 14, 606, 5, 2029'));
}

function checkUserAnswer(numbersArray) {
    let result = true;
    numbersArray.forEach(function (item) {
        if (isNaN(item) ||
            item === null ||
            item === '') {
            result = false;
        }
    });
    return result;
}

function pasteResult(userName, userNumbers, numbersArray, maxElm, minElm, greetingsElm) {
    const sortedNumbersArray = numbersArray.sort(compareNumeric);
    const firstItemNumsArray = sortedNumbersArray[0];
    const lastItemNumsArray = sortedNumbersArray[sortedNumbersArray.length - 1];

    greetingsElm.innerHTML = `<p>Hello, ${userName} </p>`;
    maxElm.innerHTML = `<p>Max value in list: ${lastItemNumsArray} </p>`;
    minElm.innerHTML = `<p>Min value in list: ${firstItemNumsArray} </p>`;
}

function pasteErrorMessage(maxElm, minElm) {
    maxElm.innerHTML = "<div style='height:100px;background-color:red;font-size:30px;width:200px;text-align:center;'>NUMBERS</div>";
    minElm.innerHTML = "<div style='height:100px;background-color:red;font-size:30px;width:200px;text-align:center;'>ERROR</div>";
}

function compareNumeric(firstValue, secondValue) {
    if (firstValue > secondValue) return 1;
    if (firstValue === secondValue) return 0;
    if (firstValue < secondValue) return -1;
}





