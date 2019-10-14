


const url = '';


// setTimeout(() => {
//     console.log('alert')
// },1000)


createTimer(10000).then(() => {
    console.log('alert')
    return fetch(url )
})
    .catch(() =>{
    console.log('error')});

function createTimer(miliseconds) {
    return  new Promise((resolve, reject) => {
        if(miliseconds >= 5000){
            reject();
        } else {
        setTimeout(() => {
            console.log('fire')
        }, miliseconds);

        }

})
}

