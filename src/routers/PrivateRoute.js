import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';

export const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => ( //..rest its get the rest of props such as exact, path and other props and pass it down to <Route/> component
    <Route {...rest} component={(props) => ( //props means pass all props such as history, path, exact, component to <Route/>
        isAuthenticated ? (
            <div>
                <Header />
                <Component {...props} />
            </div>            
            ) : (
            <Redirect to="/"/>
            ) 
        )} />
);

// export const PrivateRoute = (props) => (
//     <Route {...props} />
// );
const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);