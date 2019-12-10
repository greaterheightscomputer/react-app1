import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { 
    startAddExpense, 
    addExpense, 
    editExpense, 
    startEditExpense,
    removeExpense, 
    setExpenses, 
    startSetExpenses,
    startRemoveExpense
 } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const uid = 'thisismytestuid';
const defaultAuthState = { auth: { uid } };
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const expenseData = {};
    expenses.forEach(({ id, description, note, amount, createdAt }) => {
        expenseData[id] = { description, note, amount, createdAt };
    });
    database.ref(`users/${uid}/expenses`).set(expenseData).then(() => done());
});

test('should setup remove expense action object', () =>{
    const action = removeExpense({ id: '123abc'});
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    })
});

test('should remove expense from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[2].id;
    store.dispatch(startRemoveExpense({ id })).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
          type: 'REMOVE_EXPENSE',
          id      
        });
        return database.ref(`users/${uid}/expenses/${id}`).once('value');        
        // done();
    })
    .then((snapshot) => {
        expect(snapshot.val()).toBeFalsy();  //when u use snapshot.val() on already remove item it will return null that is why we use toBeFalsy() in the expect() expression.
        done();
    });    
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

test('should edit expense from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[0].id;
    const updates = { amount: 2390 };
    store.dispatch(startEditExpense(id, updates)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates
        });
        return database.ref(`users/${uid}/expenses/${id}`).once('value');        
    }).then((snapshot) => {
        expect(snapshot.val().amount).toBe(2390);
        done();
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
// test('should add expense to database and store', () => { //done() will force jest or test cases to wait untill data is inserted or sink into firebase 
    const store = createMockStore(defaultAuthState); //this createMockStore({}) is a mock or fake 
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
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');  //fetching data from firebase with the id generated from firebase actions[0].expense.id 
    }).then((snapshot) =>{ 
        expect(snapshot.val()).toEqual(expenseData);   
        done();     
    });
});

test('should add expense to with defaults to database and store', (done) => {
// test('should add expense to with defaults to database and store', () => {
    const store = createMockStore(defaultAuthState);
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
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');  
    }).then((snapshot) =>{ 
        expect(snapshot.val()).toEqual(expenseData);   
        done();     
    });
});

test('should setup set expense action object with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
    expect(action).toMatchSnapshot();
});

test('should fetch the expenses from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });        
        done();
    });    
});
