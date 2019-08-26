export default (expenses) => {
    // if (expenses.length === 0) {
    //     return 0;
    // }else {
        // return expenses
        //        .map((expense) => expense.amount)
        //        .reduce((sum, value) => sum + value, 0); //where sum=accumulated sum, value=new value, 0 the starting point 
    // }

    return expenses
           .map((expense) => expense.amount)
           .reduce((sum, value) => sum + value, 0); //where sum=accumulated sum, value=new value, 0 the starting point 
};