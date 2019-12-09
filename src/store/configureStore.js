import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import expensesReducer from '../reducers/expenses';
import filterReducer from '../reducers/filters';
import authReducer from '../reducers/auth';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;  //if we are using devtool it will make use of window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ else if we are not using devTool it will make use of compose function

export default () => {
    const store = createStore(    
        combineReducers({
            expenses: expensesReducer,
            filters: filterReducer,
            auth: authReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
        //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()         
    );        

    return store;
};
