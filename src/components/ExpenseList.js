import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

//The Component that Fetch data from database
// React component
export const ExpenseList = (props) => (
    <div>             
        {
            props.expenses.length === 0 ? (
                <p>No expenses</p>
            ) : (
                props.expenses.map((expense) => {
                    return <ExpenseListItem key={expense.id} {...expense}/>
                })
            )
        }
    </div>
);

//Redux store
const mapStateToProps = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters)
        // expenses: state.expenses,
        // filters: state.filters
    };
};

// Higher Order Component
// connect -> connect the component with redux store
// this connection allow our component to access any data from the redux store
export default connect(mapStateToProps)(ExpenseList);

