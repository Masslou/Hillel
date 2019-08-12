'use strict';

const questions = {
    questionOne: 'Choose action (add, sub, div, mult)',
    questionTwo: 'Type the operand',
};

let operationType = chooseOperationType();
let fistOperand = askOperand();
let secondOperand = askOperand();
let result = null;

switch (operationType) {
    case 'add' : result = add(fistOperand, secondOperand); break;
    case 'div' : result = div(fistOperand, secondOperand); break;
    case 'mult': result = mult(fistOperand, secondOperand); break;
    case 'sub' : result = sub(fistOperand, secondOperand); break;
    default: alert('operation error');
}

showResult(result);


function chooseOperationType() {
    let operation = null;

    do {
        operationType = prompt(questions.questionOne);
    } while (
        operationType != 'add' &&
        operationType != 'div' &&
        operationType != 'mult' &&
        operationType != 'sub'
        );

    return operation;
}

function askOperand() {
    let operand = null;

    do {
        fistOperand = +prompt(questions.questionTwo, '0');
    } while (isNaN(fistOperand));

    return operand;
}

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

function showResult(result) {
    alert('The resul of the operation' + result);
}