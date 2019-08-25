import { createStore } from 'redux';

//Action generators - functions that return action objects

// const incrementCount = (payload = {}) => ({
//     type: 'INCREMENT',                          //action object property
//     incrementBy: typeof payload.incrementBy === 'number' ? payload.incrementBy : 1
// });

// Destructuring Action Generator Function
const incrementCount = ({ incrementBy = 1 } = {}) => ({ 
    type: 'INCREMENT',                          
    incrementBy: incrementBy
});
const decrementCount = ({ decrementBy = 1} = {}) => ({
    type: 'DECREMENT',
    decrementBy: decrementBy
});
const setCount = ({ count }) => ({
    type: 'SET',
    count: count    
});
const resetCount = () => ({
    type: 'RESET'
});

//Reducers
//1. Reducers are pure functions -> pure functions are functions where there output dependent main on their input. They are functions that doesn't reference any global variable outside that functions.
//2. Reducers never change state or action -> means you pass values to the state or action and the new object return the value, you don't change them manually. 
const countReducer = ((state = { count: 0 }, action) => {
    switch (action.type) {
        case 'INCREMENT':             
            return {
               count: state.count + action.incrementBy
            };
        case 'DECREMENT':             
            return {
               count: state.count - action.decrementBy
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
const store = createStore(countReducer);

store.subscribe(() => {  //subscribe() is use to watch the state as its changes
    console.log(store.getState());   
});

store.dispatch(incrementCount({ incrementBy: 5 }));  //this incrementBy is called custom data
store.dispatch(incrementCount());
store.dispatch(resetCount()); 
store.dispatch(decrementCount());
store.dispatch(decrementCount({ decrementBy: 10 }));
store.dispatch(setCount({ count: 101 }));
