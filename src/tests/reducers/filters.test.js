import moment from 'moment';
import filtersReducer from '../../reducers/filters';

test('should setup default filter values', () => {
    const action = { type: '@@INIT' };
    const state = filtersReducer(undefined, action); //type: '@@INIT':- this is the default value for action object type
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test('should set sortBy to amount', () => {
    const action = { type: 'SORT_BY_AMOUNT' };
    const state = filtersReducer(undefined, action);
    expect(state.sortBy).toBe('amount');
});

test('should set sortBy to date', () => {
    const currentState = {
        text: '',
        startDate: undefined,
        endDate: undefined,
        sortBy: 'amount'    //the sortBy property value is amount beco's the default value is date, that is why we change the sortBy to amount   
    };
    const action = { type: 'SORT_BY_DATE' };
    const state = filtersReducer(currentState, action);
    expect(state.sortBy).toBe('date');
});

//should set text filter
test('should set sortBy to text', () => {
    const text = 'It is a big bag';
    const action = { 
        type: 'SET_TEXT_FILTER', 
        text 
    };    
    const state = filtersReducer(undefined, action);
    expect(state.text).toBe(text);
});

//should set startDate filter
test('should set sortBy to startDate', () => {
    const startDate=moment().startOf('month');
    const action = { 
        type: 'SET_START_DATE', 
        startDate 
    };    
    const state = filtersReducer(undefined, action);
    expect(state.startDate).toEqual(startDate);
});

//should set endDate filter
test('should set sortBy to startDate', () => {
    const endDate=moment().endOf('month');
    const action = { 
        type: 'SET_END_DATE', 
        endDate 
    };    
    const state = filtersReducer(undefined, action);
    expect(state.endDate).toEqual(endDate);
});