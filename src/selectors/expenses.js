import moment from 'moment';

// 6. Get visible expenses -> this function will match the expenses object with the filters object
// It take in array expenses and destructured filter object and reture filtered and sorted array

export default (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {  
        // const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        // const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const createdAtMoment = moment(expense.createdAt);
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) =>{    //sort() get called on array
          if(sortBy === 'date') {
              return a.createdAt < b.createdAt ? 1 : -1;
        }
        if(sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
      }
    });
};