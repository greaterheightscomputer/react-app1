import { firebase, googleAuthProvider } from '../firebase/firebase';

//action generator function
export const login = (uid) => ({
    type: 'LOGIN',
    uid
});

//asynchronous action
export const startLogin = () => {
    return () => {
        return firebase.auth().signInWithPopup(googleAuthProvider);
    };
};

//action generator function
export const logout = () => ({
    type: 'LOGOUT'
});

export const startLogout = () => {
    return () => { //return a function to comform with redux thunk specification
        return firebase.auth().signOut();
    }
};