'use strict';

const students = [
    new Student('Petya', [10, 9, 8, 0, 10]),
    new Student('Васян', [10, 9, 8, 1, 10]),
];

function Student(name, mark) {
    this.name = name;
    this.mark = mark;
}

Student.prototype.averageMark = function () {
    const sum = this.mark.reduce((a, b) => a + b);
    return sum / this.mark.length;
};


function averageGroupMark(students) {
    return students.reduce((acc, student) => {
        return acc += student.averageMark()
    }, 0) / students.length;
}

console.log('Average group mark is : ' + averageGroupMark(students));

