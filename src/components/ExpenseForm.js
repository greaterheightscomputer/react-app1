import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

// const now = moment();
// console.log(now.format('MMM Do, YYYY'));

export default class ExpenseForm extends React.Component {
    constructor(props){ //constructor(props) its will allow ExpenseForm to access the super class (EditExpensePage) props if its exist else its return null  
        super(props);

        this.state = {
            description: props.expense ? props.expense.description : '', 
            note: props.expense ? props.expense.note : '',
            amount: props.expense ? (props.expense.amount / 100).toString() : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            error: ''
        };
    }    
    onDescriptionChange = (e) => {
        const description = e.target.value;
        // console.log(description)
        this.setState(() => ({ description }));
    };
    onNoteChange = (e) => {
        // const note = e.target.value;
        e.persist();
        this.setState(() => ({ note: e.target.value }));
    };
    onAmountChange = (e) => {
        const amount = e.target.value;
        if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)){  //!amount its will allow user to delete the text field of amount 
            this.setState(() => ({ amount }));
        }
    };
    onDateChange = (createdAt) => { //api of onDateChange get called with date as an argument since createdAt represent date that is why it is pass as an argument
        if (createdAt) {  //if statement will prevent the user from delete the date field
            this.setState(() => ({ createdAt }));
        };        
    };
    onFocusChange = ({ focused }) => { //destructuring of {focused}
        this.setState(() => ({ calendarFocused: focused }));
    };
    onSubmit = (e) => {
        e.preventDefault();  //prevent full page refresh
        if (!this.state.description || !this.state.amount){
            this.setState(() => ({ error: 'Please provide description or amount' }));            
        }else{
            this.setState(() => ({ error: '' }));  
            this.props.onSubmits({  //we pass the data out of the ExpenseForm by calling the props from the parent component we did that beco's we want to use the ExpenseForm on AddExpensePage and later on EditExpensePage 
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) * 100,
                createdAt: this.state.createdAt.valueOf(),     //valueOf() return moment in milliseconds value
                note: this.state.note
            });
        }
    };
    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onSubmit}>
                    <input 
                        type="text" 
                        placeholder="Description" 
                        autoFocus  
                        value={this.state.description} 
                        onChange={this.onDescriptionChange}
                    />
                    <input 
                        type="text" 
                        placeholder="Amount" 
                        value={this.state.amount} 
                        onChange={this.onAmountChange} 
                    />
                    <SingleDatePicker 
                        date={this.state.createdAt}     //display the current date as the app render on the browser since the initial value of createdAt is set to moment()
                        onDateChange={this.onDateChange}   //it is use to change the application state when the user select new date 
                        focused={this.state.calendarFocused} //focused by default is false beco's user is not interreacting with the datepicker
                        onFocusChange={this.onFocusChange} //onFocusChange() means user is now changing the app state by intereacting with calenderFocus property by changing from false to true
                        numberOfMonths={1}    //it will render only one month
                        isOutsideRange={() => false}    //it will allow user to select or pick date back in time
                    />
                    <textarea 
                        placeholder="Add a note for your expense (optional)" 
                        value={this.state.note} 
                        onChange={this.onNoteChange}
                    >
                    </textarea>
                    <button>Add Expense</button>
                </form>
            </div>
        );
    }
}