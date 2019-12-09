import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

export const LoginPage = ({ startLogin }) => ( //destructure startLogin
//export const LoginPage = (props) => (
// <button onClick={props.startLogin}>Login</button>
    <div>
        <button onClick={startLogin}>Login</button>        
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage); 