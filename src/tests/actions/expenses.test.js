import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddExpense, addExpense, editExpense, removeExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

test('should setup remove expense action object', () =>{
    const action = removeExpense({ id: '123abc'});
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    })
});

test('should setup edit expense action object', () => {
    const action = editExpense('123abc', { note: 'New note value' });
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {
            note: 'New note value'
        }
    });
});

test('should setup add expense action object with provided values', () => {    
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    });
});

//asynchronous test cases
test('should add expense to database and store', (done) => {
// test('should add expense to database and store', () => { //done() will force jest to wait untill data is inserted into firebase 
    const store = createMockStore({}); //this createMockStore({}) is a mock or fake 
    const expenseData = {
        description: 'Books',
        amount: 1200,
        note: 'This one is better',
        createdAt: 2000
    };

    //inserting data assertion
    store.dispatch(startAddExpense(expenseData)).then(() => { //then() the then success case will fire after the data as been inserted to the firebase beco's of the return keyword will we add to database.ref('expenses') in the actions/expenses.js after the we will use the return value to make assertion 
        //how we can get data to the redux mock or fake store which will be the return value or data that come back from firebase
        const actions = store.getActions(); //store.getActions() contain all the Action Generator Functions where actions[0] represent addExpense()
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData            
            }
        });
        
        //fetching data assertion  
        // database.ref(`expenses/${actions[0].expense.id}`).once('value').then((snapshot) =>{ //fetching data from firebase with the id generated from firebase actions[0].expense.id 
        // expect(snapshot.val()).toEqual(expenseData);   
        //     done();     
        // });
        return database.ref(`expenses/${actions[0].expense.id}`).once('value');  //fetching data from firebase with the id generated from firebase actions[0].expense.id 
    }).then((snapshot) =>{ 
        expect(snapshot.val()).toEqual(expenseData);   
        done();     
    });
});

test('should add expense to with defaults to database and store', (done) => {
// test('should add expense to with defaults to database and store', () => {
    const store = createMockStore({});
    const expenseData = {
        description: '',
        amount: 0,
        note: '',
        createdAt: 0
    };

    //inserting data assertion
    store.dispatch(startAddExpense({})).then(() => {         
        const actions = store.getActions(); 
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData            
            }
        });
        
        //fetching data assertion          
        return database.ref(`expenses/${actions[0].expense.id}`).once('value');  
    }).then((snapshot) =>{ 
        expect(snapshot.val()).toEqual(expenseData);   
        done();     
    });
});
// test('should setup add expense action object with default values', () => {
//     const action = addExpense();
//     expect(action).toEqual({  
//         type: 'ADD_EXPENSE',
//         expense:{
//             id: expect.any(String),
//             description: '',
//             note: '',
//             amount: 0,
//             createdAt: 0
//         }
//     });
// });