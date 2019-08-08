'use strict';

const questions = {
    questionOne: {
        questionText: 'JS круче Java?',
        score: 10,
        answer: true
    },
    questionTwo: {
        questionText: 'Напишите фамилию лучшего футболиста мира',
        score: 10,
        answer: 'Месси'
    },
    questionThree: {
        questionText: 'Эта программа гениальна?',
        score: 10,
        answer: false
    }
};

let userPoints = 0;

confirm(questions.questionOne.questionText) === questions.questionOne.answer ? userPoints += questions.questionOne.score : null;
prompt(questions.questionTwo.questionText) === questions.questionTwo.answer ? userPoints += questions.questionTwo.score : null;
confirm(questions.questionThree.questionText) === questions.questionThree.answer ? userPoints += questions.questionThree.score : null;

let message;

switch (userPoints) {
    case 10 :
        message = 'У Вас 10 баллов. Слабо';
        break;
    case 20 :
        message = 'У Вас 20 баллов. Не плохо!';
        break;
    case 30 :
        message = 'У Вас 30 баллов. Супер!';
        break;
    default :
        message = 'Ну, не знать про Месси это стыдно';
}

alert(message);
