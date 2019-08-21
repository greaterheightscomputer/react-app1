import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should set default state', () => {
    const state = expensesReducer(undefined, { type: '@@INT' });
    expect(state).toEqual([]);
});

test('should remove expense by id', () => {
    const action = {     //at this point you are creating an action dispatcher
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    };
    const state = expensesReducer(expenses, action); //at this point you are dispatch an action
    expect(state).toEqual([expenses[0], expenses[2]]);  //making an assertion  //remove expenses[1] and leave the remain ones
});

test('should not remove expense if id not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '-1'
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);  
});

// should add an expense
test('should add an expense', () => {
    const expense = {
        id: 3,
        description: 'Books',
        note: '',
        amount: 2000,
        createdAt: 0
    };
    const action={
        type: 'ADD_EXPENSE',
        expense: expense
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([...expenses, expense])
}); 

// should edit an expense
test('should edit an expense', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: 3,
        updates: {
            description: 'pencil'
        }             
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses)
});
// should not edit expense if expense not found
test('should not edit an expense if id not found', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: -3,
        updates: {
            description: 'pencil'
        }             
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses)
});