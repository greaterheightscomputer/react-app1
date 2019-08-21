import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

//4. CREATING THE FOLLOWING ACTION GENETOR FUNCTIONS
// ADD_EXPENSE     
const addExpense = ({ description='', note='', amount=0, createdAt=0 } = {}) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});
// REMOVE_EXPENSE    
const removeExpense = ( { id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});
// EDIT_EXPENSE  
const editEpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});
// SET_TEXT_FILTER  
const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});
// SORT_BY_DATE
const sortByDate = () => ({
    type: 'SORT_BY_DATE' 
});    
// SORT_BY_AMOUNT    
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});
// SET_START_DATE   
const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
});
// SET_END_DATE
const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
});
//1a. Expenses Reducer
// Reducer is a pure function that manipulate state by using action object property type to produce new return object.
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            // return state.concat(action.expense);
            return [...state, action.expense];    //using [...state, action.expense] means ES6 spread operator where ...state = current items in the array and action.expense = new items in the array
        case 'REMOVE_EXPENSE':            
            return state.filter(({ id }) => id !== action.id);  //{ id } means destructuring 
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.id === action.id){
                    return {...expense, ...action.updates};
                }else {
                    return expense;
                }
            });                
        default: return state;        
    }
};
                                                                                                                                                                                                                                                                                                                        
//Challenge area
// Create Filter Reducer
// Create default value for filter object:  text =>'', sortBy => 'date', startDate => undefined, endDate => undefined 

//1b. Filter Reducer
const filterReducerDefaultState = {
    text: '',
    sortBy: 'date', //date or amount
    startDate: undefined,
    endDate: undefined
};
const filterReducer = (state = filterReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {...state, text: action.text};
        case 'SORT_BY_DATE':
            return {...state, sortBy: 'date'};
        case 'SORT_BY_AMOUNT':
            return {...state, sortBy: 'amount'};
        case 'SET_START_DATE':
            return {...state, startDate: action.startDate};
        case 'SET_END_DATE':
            return {...state, endDate: action.endDate};
        default: return state;
    }    
};

// 6. Get visible expenses -> this function will match the expenses object with the filters object
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {  //filter() allow us to return a subset of an array.
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) =>{    //sort() get called on array
          if(sortBy === 'date') {
              return a.createdAt < b.createdAt ? 1 : -1;
        }
        if(sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
      }
    });
};

//2. Store Creation
// Store -> contain a reducer or combineReducers. combineReducers -> are objects whose values are reducers 
const store = createStore(     // combineReducers -> let you combine multiple reducers to create a single store.
    combineReducers({
        expenses: expensesReducer,
        filters: filterReducer
    })         
);               

//3. Subscribe Creation
store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);    
    // console.log(state);   
});
                           
//5a. Action Dispatch for Expenses
const expenseOne = store.dispatch(addExpense({description:'Rent', amount: 100, createdAt: -21000}));  //dispatch call
const expenseTwo = store.dispatch(addExpense({description:'Coffee', amount: 300, createdAt: -1000}));
// store.dispatch(removeExpense({ id: expenseOne.expense.id }));
// store.dispatch(editEpense(expenseTwo.expense.id, { amount: 500 }));
// // console.log(expenseOne);

// //5b. Action Dispatch for Filter
// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(2000));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(999));

const demoState = {
    expenses: [{
        id: 'sdlfjkpweopkerw',
        description: 'January Rent',
        note: 'This was the final payment for that address',
        amount: 54500,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', //date or amount
        startDate: undefined,
        endDate: undefined
    }
};

// // Spread Operator with Object
// const user = {
//     name: 'Ayo',
//     age: 23
// };
// console.log({...user, locatio: 'Lagos Island', age: 28})  //it will throw an error beco's we need to install library before we use it.