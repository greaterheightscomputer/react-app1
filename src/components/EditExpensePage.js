import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editEpense, removeExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {
    onSubmited = (expense) => {
        this.props.editEpense(this.props.expense.id, expense);
        this.props.history.push('/');   
    };
    onRemove = () => {
        this.props.removeExpense({ id: this.props.expense.id });
        this.props.history.push('/'); 
    };
    render(){
        return (
            <div>
                <ExpenseForm   
                    expense={this.props.expense} //its will get expense properties from mapStateToProps property expense (redux store) and set on the application state as a result once user click on the description property link on the DashboardPage its will populate the text fields with values.  
                    onSubmits={this.onSubmited} //its get the edited data from the sub-class ExpenseForm and pass to editEpense() Action Generator Function
                />
                <button onClick={this.onRemove}>Remove</button>
            </div>
        );
    }
};

const mapStateToProps = (state, props) => ({
    expense: state.expenses.find((expense) => expense.id === props.match.params.id) //if find() return true its means its has find a match then its store that particular expense properities in expense object          
});

const mapDispatchToProps = (dispatch, props) => ({
    editEpense: (id, expense) => dispatch(editEpense(id, expense)),
    removeExpense: (data) => dispatch(removeExpense(data))    
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);

