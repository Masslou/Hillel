'use strict';

const questions = {
    questionOne: 'Choose action (add, sub, div, mult)',
    questionTwo: 'Type the first operand',
    questionThree: 'Type the second operand'
};

let operationType = null;
let fistOperand = null;
let secondOperand = null;
let result = null;
let successMessage;

do {
    operationType = prompt(questions.questionOne);
} while (
    operationType != 'add' &&
    operationType != 'div' &&
    operationType != 'mult' &&
    operationType != 'sub'
    );

do {
    fistOperand = +prompt(questions.questionTwo);
} while (isNaN(fistOperand));

do {
    secondOperand = +prompt(questions.questionThree);
} while (isNaN(secondOperand));


switch (operationType) {
    case 'add' :
        result = add(fistOperand, secondOperand);
        break;
    case 'div' :
        result = div(fistOperand, secondOperand);
        break;
    case 'mult':
        result = mult(fistOperand, secondOperand);
        break;
    case 'sub' :
        result = sub(fistOperand, secondOperand);
        break;
}

successMessage = 'Result of ' + operationType + ' operation is ' + result;
showResult(successMessage);


function add(firstOperand, secondOperand) {
    return firstOperand + secondOperand;
}

function div(firstOperand, secondOperand) {
    return firstOperand / secondOperand;
}

function mult(firstOperand, secondOperand) {
    return fistOperand * secondOperand;
}

function sub(firstOperand, secondOperand) {
    return firstOperand - secondOperand;
}

function showResult(message) {
    alert(message);
}