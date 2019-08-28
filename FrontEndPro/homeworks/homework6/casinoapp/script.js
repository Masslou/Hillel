'use strict';

const MIN_VALUE = 0;
const MAX_VALUE = 10;
const CORRECT_ANSWER_POINTS = 10;

startGame();


function askNumber() {
    let number;

    do {
        number = +prompt(`Enter value between ${MIN_VALUE} and ${MAX_VALUE}: `);
    } while (number < MIN_VALUE ||
        number > MAX_VALUE ||
        isNaN(number)
        );

    return number;
}

function generateRandomNumber(minValue, maxValue) {
    return Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
}

function calculatePoints(number, randomNumber, userScore) {
    let points = number === randomNumber ? CORRECT_ANSWER_POINTS : null;

    return points + userScore;
}

function informationAlert(number, randomNumber, points) {
    alert(`Your number is : ${number} , program number is: ${randomNumber} Overall result: ${points}`);
}

function startGame(points) {

    let userScore = points ? points : null;
    let randomNumber = generateRandomNumber(MIN_VALUE, MAX_VALUE);
    let number = askNumber();
    let summaryPoints = calculatePoints(number, randomNumber, userScore);
    informationAlert(number, randomNumber, summaryPoints);

    if (confirm('Repeat again?')) {
        return startGame(summaryPoints);
    }

    return alert('Have a nice day!');
}
