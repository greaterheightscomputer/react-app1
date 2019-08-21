import { addExpense, editEpense, removeExpense } from '../../actions/expenses';

test('should setup remove expense action object', () => {
    const action = removeExpense({ id: '129092334'});
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '129092334'
    });
});

test('should steup edit expense action object', () => {
    const action = editEpense( '123', {note: 'what is your name' });
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123',
        updates: {
            note: 'what is your name'
        }
    });
});

test('should setup add expense action object with provided values', () => {
    const expenseData = {
        description: 'Rent',
        amount: 1923,
        createdAt: 1000,
        note: 'It is good'
    };
    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            id: expect.any(String)   //expect.any(String) it is use to generate dynamic value if you don't know what the value will be
        }
    })
});

test('should setup add expense action object with default values', () => {    
    const action = addExpense();
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),     
            description:'',
            note:'',
            amount:0,
            createdAt:0
        }
    })
});