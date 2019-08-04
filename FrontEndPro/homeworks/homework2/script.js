'use strict';

const questions = {
    questionOne: {
        questionText: 'JS круче Java?',
        answer: false,
        score: 10
    },
    questionTwo: {
        questionText: 'Напишите фамилию лучшего футболиста мира',
        answer: 'Месси',
        score: 10
    },
    questionThree: {
        questionText: 'Эта программа гениальна?',
        answer: false,
        score: 10
    },
};

let userPoints = 0;

questions.questionOne.answer = confirm(questions.questionOne.questionText);

userPoints = questions.questionOne.answer ? userPoints + questions.questionOne.score : userPoints;

if (prompt(questions.questionTwo.questionText) == questions.questionTwo.answer) {
    userPoints += questions.questionTwo.score;
}

questions.questionThree.answer = confirm(questions.questionThree.questionText);

userPoints = questions.questionThree.answer ? userPoints + questions.questionThree.score : userPoints;

switch (userPoints) {
    case 10 :
        alert('У Вас 10 баллов. Слабо');
        break;
    case 20 :
        alert('У Вас 20 баллов. Не плохо!');
        break;
    case 30 :
        alert('У Вас 30 баллов. Супер!');
        break;
    default :
        alert('Ну, не знать про Месси это стыдно');
}

