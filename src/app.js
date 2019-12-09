import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import { login, logout } from './actions/auth';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css'
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import './firebase/firebase';
// import './playground/promises';
import { firebase } from './firebase/firebase';

const store = configureStore();

// Provider -> allow us to provide the store to all the components that make up our applications
//<AppRouter /> this is where we have all our applicatin components
const jsx = (
    <Provider store={store}>
        <AppRouter />    
    </Provider>
    );

let hasRendered = false;
const renderApp = () => {
    if(!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;    
    }
};

ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

//tracing user on authentication or keep state of authentication
firebase.auth().onAuthStateChanged((user) => {    
    if(user) {
        store.dispatch(login(user.uid));
        store.dispatch(startSetExpenses()).then(() => {
            renderApp();
            if (history.location.pathname === '/') { //this history.location.pathname means login page
                history.push('/dashboard');
            }
        });
        // console.log('log in', {
        //     databaseName: user.C,
        //     userName: user.displayName,
        //     userEmail: user.email,
        //     emailVerified: user.emailVerified,
        //     userUID: user.uid, 
        //     userLog: 'Login'
        // });      
    } else {
        store.dispatch(logout());
        renderApp();  //this renderApp() will render the application else the application will be on the loading page
        history.push('/');
    }
});   
