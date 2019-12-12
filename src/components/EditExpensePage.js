import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {
    onSubmited = (expense) => {
        this.props.startEditExpense(this.props.expense.id, expense);
        this.props.history.push('/');   
    };
    onRemove = () => {
        this.props.startRemoveExpense({ id: this.props.expense.id });
        this.props.history.push('/'); 
    };
    render(){
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Edit Expense</h1>
                    </div>
                </div>
                <div className="content-container">
                    <ExpenseForm   
                        expense={this.props.expense} //its will get expense properties from mapStateToProps property expense (redux store) and set on the application state as a result once user click on the description property link on the DashboardPage its will populate the text fields with values.  
                        onSubmit={this.onSubmited} //its get the edited data from the sub-class ExpenseForm and pass to editEpense() Action Generator Function
                    />                
                    <button className="button button--secondary" onClick={this.onRemove}>Remove Expense</button>
                </div>                
            </div>
        );
    }
};

const mapStateToProps = (state, props) => ({
    expense: state.expenses.find((expense) => expense.id === props.match.params.id) //if find() return true its means its has find a match then its store that particular expense properities in expense object          
});

const mapDispatchToProps = (dispatch, props) => ({
    startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
    startRemoveExpense: (data) => dispatch(startRemoveExpense(data))    
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);

