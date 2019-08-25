import { createStore } from 'redux';

// const store = createStore((state = { count: 0 }) => {   
//     return state;
// });
// console.log(store.getState());  //store.getState() return the current state  

//Adding dispatch() method
// const store = createStore((state = { count: 0 }) => {
//     console.log('runinng');
//     return state;
// });
// console.log(store.getState());   
// store.dispatch({
//         type: 'INCREMENT'
// });
// console.log(store.getState());

//Using if and switch statement with dispatch() method 
// const store = createStore((state = { count: 0 }, action) => {
//     // if (action.type === 'INCREMENT') {
//     //     return {
//     //         count: state.count + 1
//     //     };
//     // }else{
//     //     return state;
//     // }

//     switch (action.type) {
//         case 'INCREMENT': 
//             return {
//                count: state.count + 1
//             };
//         case 'DECREMENT': 
//             return {
//                count: state.count - 1
//             };
//         case 'RESET': 
//             return {
//                count: 0
//             };
//         default:
//             return state;
//     }
// });
// console.log(store.getState());   

// store.dispatch({    //the dispatch() set the action type OR change the state
//         type: 'INCREMENT'
// });
// store.dispatch({    
//     type: 'INCREMENT'
// });
// store.dispatch({    
//     type: 'RESET'
// });
// store.dispatch({
//     type: 'DECREMENT'
// });
// console.log(store.getState());

// //Using subscribe() and unsubscribe() in Redux 
// const store = createStore((state = { count: 0 }, action) => {
//     switch (action.type) {
//         case 'INCREMENT': 
//             return {
//                count: state.count + 1
//             };
//         case 'DECREMENT': 
//             return {
//                count: state.count - 1
//             };
//         case 'RESET': 
//             return {
//                count: 0
//             };
//         default:
//             return state;
//     }
// });

// // store.subscribe(() => {  //subscribe() is use to watch the state as its changes
// //     console.log(store.getState());   
// // });
// const unsubscribe = store.subscribe(() => {  //to stop watching the state as its changes
//     console.log(store.getState());   
// });

// store.dispatch({   
//     type: 'INCREMENT'
// });

// unsubscribe();

// store.dispatch({    
//     type: 'INCREMENT'
// });
// store.dispatch({    
//     type: 'RESET'
// });
// store.dispatch({
//     type: 'DECREMENT'
// });

//Dynamic Actions
const store = createStore((state = { count: 0 }, action) => {
    switch (action.type) {
        case 'INCREMENT': 
            const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy : 1;
            return {
               count: state.count + incrementBy
            };
        case 'DECREMENT': 
            const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1;
            return {
               count: state.count - decrementBy
            };
        case 'SET':
            return {
               count: action.count
            };
        case 'RESET': 
            return {
               count: 0
            };
        default:
            return state;
    }
});

store.subscribe(() => {  //subscribe() is use to watch the state as its changes
    console.log(store.getState());   
});

store.dispatch({   //this {} is called inline action object
    type: 'INCREMENT',
    incrementBy: 5         //custom data
});
store.dispatch({    
    type: 'INCREMENT'
});
store.dispatch({    
    type: 'RESET'
}); 
store.dispatch({
    type: 'DECREMENT'
});
store.dispatch({
    type: 'DECREMENT',
    decrementBy: 10
});
store.dispatch({
    type: 'SET',
    count: 101
});
