// const person = {
//     // name: 'Kehinde',
//     age: 28,
//     location: {
//         city: 'Lagos Island',
//         temp: 27
//     }
// };
// // console.log(`${person.name} is ${person.age}.`);

// // const name = person.name;
// // const age = person.age;
// // console.log(`${name} is ${age}.`);

// // const { name, age } = person;   //ES6 object destructuring
// // console.log(`${name} is ${age}.`);

// // if (person.location.city && person.location.temp) {
// //     console.log(`It's ${person.location.temp} in ${person.location.city}.`);
// // }

// // const { temp, city } = person.location  //ES6 object destructuring
// // if (city && temp) {
// //     console.log(`It's ${temp} in ${city}.`);
// // }

// // const { city, temp: temperature } = person.location  //rename of property
// // if (city && temperature) {
// //     console.log(`It's ${temperature} in ${city}.`);
// // }

// // const { name = 'Anonymous', age } = person;   //settingup default value
// // console.log(`${name} is ${age}.`);

// // const { name: firstName = 'Anonymous', age } = person;   //settingup default value and renaming property
// // // console.log(`${firstName} is ${age}.`);

// // challenge area
// const book = {
//     title: 'Ego is the Enemy',
//     author: 'Ryan Holiday',
//     publisher: {
//         // name: 'Penguin'
//     }
// };

// const {name: publisherName = 'Self-Published'} = book.publisher
// console.log(`The publisher name is ${publisherName}`);

//
//Array destructuring
// const address = ['109A, Tokunbo Street', 'Lagos Island', 'Lagos State', '2341'];
// console.log(`You are in ${address[0]} ${address[1]}.`);

// const [street, city, state, zip] = address;  //array destructuring
// console.log(`You are in ${street} ${city}.`);

// const [, city, state] = address;  // , means skip the item in the array
// console.log(`You are in ${city} ${state}.`);

// const address = ['109A, Tokunbo Street', 'Lagos Island', , '2341'];
// const [street, city, state='Ibadan', zip] = address;  //adding default value to an item 
// console.log(`You are in ${street} ${state}.`);

// challenge area
const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75'];
// grab first and third items using array destructuring
const [coffee, , mediumCost] = item;
console.log(`A medium ${coffee} costs ${mediumCost}.`);


