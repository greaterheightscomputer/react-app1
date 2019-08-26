import selectExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('should return 0 if no expenses', () => {
    const res = selectExpensesTotal([]);
    expect(res).toBe(0);
});

test('should correctly add up a single expense', () => {
    const res = selectExpensesTotal([expenses[0]]); //its return the first  item in the expenses array which amount is expected to 190 
    expect(res).toBe(190);
});

test('should correctly add up a multiple expenses', () => {
    const res = selectExpensesTotal(expenses); //its return the entry items in the expenses array which amount is expected to 23190 
    expect(res).toBe(23190);
});