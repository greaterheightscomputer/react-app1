import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

//The Component that Fetch data from database
// React component
export const ExpenseList = (props) => (
    <div className="content-container">    
        <div className="list-header">
            <div className="show-for-mobile">Expenses</div>
            <div className="show-for-desktop">Expense</div>
            <div className="show-for-desktop">Amount</div>
        </div>  
        <div className="list-body">       
            {
                props.expenses.length === 0 ? (   //expenses is from mapStateToProps 
                    <div className="list-item list-item--error">
                        <span>No expenses</span>
                    </div>
                ) : (
                    props.expenses.map((expense) => {
                        return <ExpenseListItem key={expense.id} {...expense}/>                    
                    })
                )
            }
        </div>
    </div>
);

//Redux store
const mapStateToProps = (state) => { //mapStateToProps it is a function that fetch data from the redux store
    return {
        expenses: selectExpenses(state.expenses, state.filters)
        // expenses: state.expenses,
        // filters: state.filters
    };
};

// Higher Order Component
// connect -> connect the component with redux store
// this connection allow our component to access any data from the redux store
export default connect(mapStateToProps)(ExpenseList); //combinating the store with the component

// const ConnectedExpensesList = connect((state) => {
//     return {
//         expenses: state.expenses
//     };
// })(ExpenseList);
// export default ConnectedExpensesList;