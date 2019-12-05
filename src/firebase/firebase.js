import * as firebase from 'firebase'; //means select all named export and store them on a new variable called firebase

 // Your web app's Firebase configuration
//  const firebaseConfig = {   //all this is equivalent to our password
//     apiKey: "AIzaSyBxGkK2-0spvf_E3-CkckffmsrXI2fF_J8",
//     authDomain: "expensify-d7fd6.firebaseapp.com",
//     databaseURL: "https://expensify-d7fd6.firebaseio.com",
//     projectId: "expensify-d7fd6",
//     storageBucket: "expensify-d7fd6.appspot.com",
//     messagingSenderId: "557135628237",
//     appId: "1:557135628237:web:bf18596458823695"
//   };
  
//firebase configuration setting for sharing multiple different database
  const firebaseConfig = {  
    apiKey: process.env.FIREBASE_API_KEY, 
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};
  // Initialize Firebase to work with the specific application provided 

firebase.initializeApp(firebaseConfig);

const database = firebase.database();
// const googleAuthProvider = new firebase.auth.GoogleAuthProvider();  //creating an instance of googleProvider

// export { firebase, googleAuthProvider, database as default } ;
export { firebase, database as default } ;


// test database connection
  // firebase.database().ref().set({
  //     name: 'Khadijat Abimbola'
  // });

// database() is a function inside firebase that is use to access our database.
//ref() is use to reference part of our database or access  a specific table.
//set() is to store data inside the it may be the root of the database or a specific part or table with different data type which may be object type, array type, string type, number type, boolean type  

// //It store object type to the root database 
//   database.ref().set({
//     name: 'Khadijat Abimbola',
//     age: 32,
//     isSingle: false,
//     location: { //Nested object
//         city: 'Lagos Island',   //nested property
//         country: 'United States'
//     }
// });

// //It store string type to the root database 
// //  database.ref().set('This is my data');

// //its set age=34 to the root of the databse
// // atabase.ref().set({
// //   age: 34
// // });

// //to update a property in the database
// database.ref('age').set(145);

// //to update a nest object property in the database
// database.ref('location/city').set('London');

// // challenge area
// // attributes: height, weight
// //add another child called attribute to a root database
// database.ref('attribute'). set({
//   height: 72,
//   weight: 80
// });

// Adding Promises to set() method return value by continue the chainning
// database.ref().set({
//   name: 'Khadijat Abimbola',
//   age: 32,  
//   streetLevel: 7,
//   job: {
//     title: 'Software Developer',
//     company: 'Google'
//   },
//   location: { 
//       city: 'Lagos Island',   
//       country: 'United States'
//   }
// }).then(() => {
//   console.log('Date is saved');
// }).catch((e) => {
//   console.log('This failed', e);
// });

// database.ref('attribute'). set({
// height: 45,
// weight: 120
// }).then(() => {
//   console.log('Second set call worked.');
// }).catch((e) => {
//   console.log('Thing did not work for the second error', e);
// });

// Remove a specific property data from database
// database.ref('isSingle')
//     .remove().then(() => {
//       console.log('Data was removed');
//     }).catch((error) => {
//       console.log('Did not remove data', error);
//     });

// // Remove a database 
// database.ref()
// .remove().then(() => {
//   console.log('Data was removed');
// }).catch((error) => {
//   console.log('Did not remove data', error);
// });

// using set() method to remove data equivalent
// database.ref('isSingle').set(null)   // pass null to set() is equivalent to calling remove()

//Updating data in the database
// database.ref().update({
//   name: 'Hameedah',             //updating
//   age: 20,                     //updating
//   job: 'Software Developer',   //inserting new data
//   isSingle: null                //deleting
// });

// database.ref().update({
//   job: 'Manager',             
//   location: {
//     city: 'Ibadan'  //its will set location nested object to city only
//   }  
// });

// database.ref().update({
//   job: 'Manager',             
//   'location/city': 'Ibadan'   //Its will update only city property of nested location object and leave the other property
// });

//challenge area
// Change the streetLevel to a 9
// Change job.company to Amazon
// Change location.city to Seattle

// database.ref().update({
//   streetLevel: 9,
//   'job/company': 'Amazon',
//   'location/city': 'Seattle'  
// });

//Fetching data from the root of database
// database.ref()
//   .once('value')   //once() method is a single data fetching its return a promises
//   .then((snapshot) => {  //snapshot is an object which contain our extracted data
//      const val = snapshot.val();  //val() method its return the data that we are requesting for
//      console.log(val);
//   })
//   .catch((e) => {
//      console.log('Error fetching data', e);
//   });

//   //Fetching a property data from database
// database.ref('location/city')
// .once('value')   //once() method is a single data fetching its return a promises
// .then((snapshot) => {  //snapshot is an object which contain our extracted data
//    const val = snapshot.val();  //val() method its return the data that we are requesting for
//    console.log(val);
// })
// .catch((e) => {
//    console.log('Error fetching data', e);
// });

  // //Fetching data from database
  // database.ref().on('value', (snapshot) => {  //on() method is a subscribing that continious fetch data from database whenever their is any changes.
  //   console.log(snapshot.val());  //its has two parameter 1st is value event which is the database value and 2nd parameter is the callback function which has snapshot object as parameter which contain the database value. 
  // });  
  
  // setTimeout(() => {
  //   database.ref('age').set(12);
  // }, 3500);

  // setTimeout(() => {
  //   database.ref('age').off();  //off() method is use to unsubcrib which means it will change the value to whatever will set it to but it will not notify us about the changes.    
  // }, 7000);

  // setTimeout(() => {
  //   database.ref('age').set(15);
  // }, 10500);

  // const onValueChange = database.ref().on('value', (snapshot) => {  //the snapshot is our successful handler //on() method is a subscribing that continious fetch data from database whenever their is any changes.
  //   console.log(snapshot.val());  //its has two parameter 1st is value event which is the database value and 2nd parameter is the callback function which has snapshot object as parameter which contain the database value. 
  // }, (e) => {
  //   console.log('Error with data fetching', e);  //failure handler  
  // });  
  
  // setTimeout(() => {
  //   database.ref('age').set(45);
  // }, 3500);

  // setTimeout(() => {
  //   database.ref('age').off(onValueChange);  //off() method is use to unsubcrib which means it will change the value to whatever will set it to but it will not notify us about the changes.    
  // }, 7000);

  // setTimeout(() => {
  //   database.ref('age').set(42);
  // }, 10500);

  // database.ref().on('value', (snapshot) => {
  //   const val = snapshot.val();
  //   console.log(`${val.name} is a ${val.job.title} at ${val.job.company}`);
  // });

  //Storing an Array of data in firebase
  // const notes = [{
  //   id: '1230',
  //   title: 'First note',
  //   body: 'This is my note'
  // }, {
  //   id: '1240',
  //   title: 'Second note',
  //   body: 'This is my note'
  // }];
  // database.ref('notes').set(notes);

// This is how we are going to store list base data   
  // database.ref('notes').push({ //using push() method will make firebase generate id implicitly which can be use to manipulate the each item
  //   title: 'School home work',
  //   body: 'Do it on time'
  // });

// //How to update notes object
// database.ref('notes/-LnSOSpSwcgSmfsVP4Tq').update({
//   body: 'I am going to London'
// }); 

//How to update notes object
// database.ref('notes/-LnSNbJzgRuPZMvHkzzS').remove(); 
  
// challenge area
// Setup "expenses" with three items (description, note, amount, createdAt)
// database.ref('expenses').push({
//   description: 'Computer',
//   note: 'Payment for new computer',
//   amount: 120000,
//   createdAt: 23459089
// });
// database.ref('expenses').push({
//   description: 'Transport',
//   note: 'Payment for transportation',
//   amount: 1500,
//   createdAt: 1000
// });
// database.ref('expenses').push({
//   description: 'Rice',
//   note: 'Payment for rice',
//   amount: 4500,
//   createdAt: 2000
// });

// How to fetch an object from database
// database.ref('expenses')
//    .once('value')
//    .then((snapshot) => {
//      console.log(snapshot.val());
//    });

//How to fetch an object and convert it to array once
// database.ref('expenses')
//    .once('value')
//    .then((snapshot) => {
//      const expenses = [];   

//      snapshot.forEach((childSnapshot) => { 
//        expenses.push({           
//         id: childSnapshot.key,   
//         ...childSnapshot.val()   
//        });
//      });
//      console.log(expenses);
//    });

//How to fetch an object and convert it to array base data using subscrib
// database.ref('expenses')
//    .on('value', (snapshot) => {  //value is the event and snapshot is the success handler
//      const expenses = [];

//      snapshot.forEach((childSnapshot) => {
//        expenses.push({
//          id: childSnapshot.key,
//          ...childSnapshot.val()
//        });
//      });
//       console.log(expenses)
//    });   

// Firebase version of array of list
//child_removed event will be fired anytime an item is removed from the expenses object in the db 
// database.ref('expenses').on('child_removed', (snapshot) => { 
//   console.log(snapshot.key, snapshot.val());
// });

//child_changed event will be fired anytime a child item is changed from the expenses object in the db 
// database.ref('expenses').on('child_changed', (snapshot) => { 
//   console.log(snapshot.key, snapshot.val());
// });

//child_added event will be fired anytime a child item is added to expenses object in the db 
// database.ref('expenses').push({
//   description: 'Computer',
//   note: 'Payment for new computer',
//   amount: 120000,
//   createdAt: 23459089
// });
// database.ref('expenses').on('child_added', (snapshot) => { 
//   console.log(snapshot.key, snapshot.val());
// });

