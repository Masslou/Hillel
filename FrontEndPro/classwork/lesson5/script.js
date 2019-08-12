// function progression(value) {
//   return value == 1 ? value : value + progression(value - 1);
// }
//
// progression(10);
//
//
// const obj1 = {
//     a: {
//         a: {
//             a: {
//                 a: {
//
//                 }
//             }
//         }
//     }
// };
//
// const obj2 = {
//     b: {
//         b: 4
//     }
// };
//
// // getA(obj1);
// getA(obj2);
//
//
// function getA(value){
// console.log(typeof value);
//
// return (typeof value == 'object') ? getA(value['a']) : value;
// }


const obj5 = {
    a: 2
};

changeA(obj5);
function changeA(value) {
    value.a = 10;
}

console.log(obj5);
