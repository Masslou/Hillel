
let a = new Promise(( resolve, reject) => {
     fetch('http://getpost.itgid.info/index2.php')
         .then(data => {
             resolve(data.text());
         })
});


a.then(data =>{
   console.log(data);
});

    // fetch('http://getpost.itgid.info/index2.php')
    //     .then(data => {
    //         console.log(data);
    //         console.log(data.text());
    //     });
    //


