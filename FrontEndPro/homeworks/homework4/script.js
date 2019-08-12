'use strict';

const questions = {
    questionOne: 'Choose action (add, sub, div, mult)',
    questionTwo: 'Type the first operand',
    questionThree: 'Type the second operand',
};

let operationType = chooseOperationType();
let fistOperand = askOperandOne();
let secondOperand = askOperandTwo();
let result = null;

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

function askOperandOne() {
    let operand = null;

    do {
        fistOperand = +prompt(questions.questionTwo);
    } while (isNaN(fistOperand));

    return operand;
}

function askOperandTwo() {
    let operand = null;

    do {
        fistOperand = +prompt(questions.questionThree);
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

function showResult(message) {
    alert('The resul of the operation' + message);
}