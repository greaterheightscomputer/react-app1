// Higher Order Component (HOC) - A component (HOC) that renders another components.
// The main aim of HOC are 
// 1. Reuse code
// 2. Render  hijacking
// 3. Prop manipulation
// 4. Abstract state

import React from 'react';
import ReactDOM from 'react-dom';

//Component
const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>This infor is: {props.info}</p>
    </div>
);

//Higher Order Component -> is a regular javaScript function that return a Higher Order Component by loading component as a parameter
const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAdmin && <p>This is private infor. Please don't share</p>}
            <WrappedComponent {...props} />
        </div>
    );
};

// challenge area
// create Higher Order Component called requireAuthentication()

const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAuthenticated ? (<WrappedComponent { ...props }/>) :(<h3>Login to view more details information</h3>)}            
        </div>
    );
};

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);

// ReactDOM.render(<AdminInfo isAdmin={true} info="There are the details" />, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={true} info="There are the details" />, document.getElementById('app'));