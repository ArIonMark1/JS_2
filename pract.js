// const async = (a, cb) => {

//     setTimeout( () => { const b = a + 1; cb(b); }, 2000);
// }

// console.log('before...')
// async(5, (b) => {
//     console.log(b); 
// });

// console.log('after...')

// const promise = new Promise( (res, rej) => {
//     setTimeout( () => {console.log('FINISHED REQUEST'); res('well done') }, 1000 )
// });

// promise.then( (data) => {console.log(data);} )
// // promice.then( () => {} ) 

const prom1 = new Promise( (ok, err) => {
    setTimeout( () => {
        let rand = (Math.random() * 10 / 5); 

        if (rand) ok('REQUEST SUCCESSFUL');
        err('ERROR!!')

    }, 2000 )
} );

prom1
.then((data) => {
    console.log( data);
})
.catch((error) => {
    let ans;
    let exectErr = parseInt(Math.random() * 4);

    switch(exectErr){
        case 1:
            ans = 'Line is broken!!';
            break;
        case 2:
            ans = 'Not correct request!!';
            break;
        case 3:
            ans = 'Server not responde!';
            break;
    }
    // return ans;
    if (!ans) console.log(error, 'Unknown error');
    console.log( error + ans);
});

// ===============================
// PRACTICK

//     • https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses – адрес API;
//     • /catalogData.json – получить список товаров;

// const API_URL = 'http://127.0.0.1:8000/products'







