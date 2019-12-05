const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('This is my resolve data');  //promise can only resolve or reject a single argument, if you want more arguments u can resolve or reject an object 
        // resolve({
        //     firstData: 'This is my resolve data',
        //     secondData: 'This is may other resolve data'
        // });
        // reject('Something went wrong!');
    }, 5000);    
});

console.log('before');

promise.then((data) => {
    console.log('1', data)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('This is my nested resolve data');  //promise can only resolve or reject a single argument, if you want more arguments u can resolve or reject an object 
            // reject('Something went wrong!');
        }, 5000);    
    });
}).then((stringData) => { //this then() will be the success case for the nested return promise 
    console.log('Run: ', stringData)
}).catch((error) => {
    console.log('error:', error);
});

// promise.then((data) => {
//     console.log('1', data)
// }, (error) => {
//     console.log('error:', error);
// });

console.log('after');