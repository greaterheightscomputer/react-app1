import React from 'react';
import { shallow } from 'enzyme';
import ExpenseListItem from '../../components/ExpenseListItem';
import expenses from '../fixtures/expenses';

test('should render ExpenseListItem with expense', () =>{
    const expense={
        id: expenses[2].id,
        description: expenses[2].description,
        amount: expenses[2].amount,
        createdAt: expenses[2].createdAt,
        note: expenses[2].note
}
    const wrapper = shallow(<ExpenseListItem expenses={expense}/>);
    expect(wrapper).toMatchSnapshot();
});