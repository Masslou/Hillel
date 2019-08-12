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
    default:
        alert('operation error');
}

showResult(result);

function chooseOperationType() {
    let operation = null;

    do {
        operation = prompt(questions.questionOne);
    } while (
        operation != 'add' &&
        operation != 'div' &&
        operation != 'mult' &&
        operation != 'sub'
        );

    return operation;
}

function askOperandOne() {
    let operand = null;

    do {
        operand = +prompt(questions.questionTwo);
    } while (isNaN(operand));

    return operand;
}

function askOperandTwo() {
    let operand = null;

    do {
        operand = +prompt(questions.questionThree);
    } while (isNaN(operand));

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
    alert('The resul of the operation: ' + result);
}