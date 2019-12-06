import uuid from 'uuid';
import database from '../firebase/firebase';

//Application life cycle in synchrous redux action          //Application life cycle in asynchrous redux action
// component calls action generator                         component calls action generator
// action generator returns object                          action generator returns function
// component dispatches object                              component dispatches function (?)
// redux store changes by running the reducer               function runs (has the ability to dispatch other actions and do whatever it wants)

//4. CREATING THE FOLLOWING ACTION GENETOR FUNCTIONS
// ADD_EXPENSE  
//Synchronous Action Generator Function   
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

//Asynchronous Action Generator Function
export const startAddExpense = (expenseData = {}) => {
    return (dispatch) => {
        const {
            description='', 
            note='', 
            amount=0, 
            createdAt=0
        } = expenseData; //destructuring from expenseData
        const expense = { description, note, amount, createdAt };
        
        return database.ref('expenses').push(expense).then((ref) => {
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }));
        });
    };
};

// REMOVE_EXPENSE    
export const removeExpense = ( { id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

// EDIT_EXPENSE  
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

// //SET_EXPENSES
export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});

// // asynchronous redux action function
export const startSetExpenses = () => {
    return (dispatch) => {
        return database.ref('expenses').once('value').then((snapshot) => {
            const expenses = [];
            // console.log(snapshot.val());
            snapshot.forEach((childSnapshot) => {
                expenses.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            }); 

            dispatch(setExpenses(expenses));
        });
    };
};