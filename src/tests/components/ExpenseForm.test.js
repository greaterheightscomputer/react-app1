import React from 'react';
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';
import moment from 'moment';

test('should render ExpenseForm correctly', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseForm with expense data', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[2]} />);
    expect(wrapper).toMatchSnapshot();
});

//find() its always contain the type of elements, id, class name that we are looking for.
//simulate() it is use to simulate an event. It is use to know if click, submit and change event is working or not. its has two parameter. The 1st is the type of event we are handling it may be submit, click or change event and the 2nd is the event object itself   
//state() its contain the name of property that is in the state of the application
test('should render error for invalid form submission', () => {
    const wrapper = shallow(<ExpenseForm/>);
    expect(wrapper).toMatchSnapshot();
    wrapper.find('form').simulate('submit', {preventDefault: () => {}});
    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
});
//at() its allow us select a particular index of an element
test('should set description on input change', () => {
    const value = 'I am going to school today';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(0).simulate('change', {target: { value }});
    expect(wrapper.state('description')).toBe(value);
    expect(wrapper).toMatchSnapshot();
});

test('should set note on textarea change', () => {
    const value = 'Where is your book';
    const wrapper = shallow(<ExpenseForm/>);
    wrapper.find('textarea').simulate('change', {
        persist: () => {},
        target: { value }});
    expect(wrapper.state('note')).toBe(value);
    expect(wrapper).toMatchSnapshot();

});

test('should set amount if valid input change', () => {
    const value = '23.56';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', {target: { value }});
    expect(wrapper.state('amount')).toEqual(value);
    expect(wrapper).toMatchSnapshot();
});

test('should set amount if invalid input change', () => {
    const value = '23.560';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', {target: { value }});
    expect(wrapper.state('amount')).toBe('');
    expect(wrapper).toMatchSnapshot();
});

//spies
test('should call onSubmit for valid form submission', () => {
    const onSubmitSpy = jest.fn();
    onSubmitSpy();   //mock or fake function
    expect(onSubmitSpy).toHaveBeenCalled();
});

test('should call onSubmit prop for valid form submission', () => {
    const onSubmitSpy = jest.fn();
    onSubmitSpy('Ola', 'Lagos');   
    expect(onSubmitSpy).toHaveBeenCalledWith('Ola', 'Lagos');
});

test('should call onSubmit with prop for valid form submission', () => {
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy}/>);
    wrapper.find('form').simulate('submit', {preventDefault: () => {}});
    expect(wrapper.state('error')).toBe('');
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[0].description,
        amount: expenses[0].amount,
        note: expenses[0].note,
        createdAt: expenses[0].createdAt
    });
});

test('should set new date on date change', () => {
    const now = moment();
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('SingleDatePicker').prop('onDateChange')(now); //(now) contain the data that suppose to be called with the event handler which is onDateChange 
    expect(wrapper.state('createdAt')).toEqual(now);
});

test('should set calendar focus on change', () => {
    const focused = true;
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('SingleDatePicker').prop('onFocusChange')({ focused });
    expect(wrapper.state('calendarFocused')).toBe(focused);
});