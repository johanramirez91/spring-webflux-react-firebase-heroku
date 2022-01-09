import React from 'react';
import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth";
import { login } from '../actions/authActions';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { useState } from 'react';

firebase.initializeApp({
    apiKey: "AIzaSyBMsrkT6oyWJIeAv73B02DmQdTYIGHSJgQ",
    authDomain: "sofkaoverflow-2da70.firebaseapp.com",
    projectId: "sofkaoverflow-2da70",
    storageBucket: "sofkaoverflow-2da70.appspot.com",
    messagingSenderId: "938870851828",
    appId: "1:938870851828:web:eaee79e4235d8205a236a1",
    measurementId: "G-DQ7NE079D9"
});

const auth = firebase.auth();

const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
}


const Login = ({ dispatch }) => {

    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })

    const [user] = useAuthState(auth);
    if (user) {
        dispatch(login(user.email, user.uid))
    }

    const handleInputChange = (event) => {
        setUserData({ ...userData, [event.target.name]: event.target.value })
    }

    const loginUser = (event) => {
        event.preventDefault();
        return auth.signInWithEmailAndPassword(userData.email, userData.password)
            .then(() => {
                swal('Hello!...')
            }).catch(() => {
                swal({
                    icon: 'error',
                    title: 'Oopss...',
                    text: 'Invalid user or password'
                })
            })
    }

    return (
        <div className='col-md-12'>
            <div className='card card-container'>
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />
                <form onSubmit={loginUser}>
                    <div className="form-group">
                        <input
                            type="text"
                            id="login"
                            name="email"
                            placeholder="Email"
                            onChange={handleInputChange}
                            value={userData.email}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleInputChange}
                            value={userData.password}
                        />
                    </div>
                    <div className='justify-content-center'>
                        <button type="submit" className="bi bi-box-arrow-in-right waves-effect indigo darken-2 white-text btn mt-3 mb-3"> Log in</button>
                        <br />
                        <button
                            type="button"
                            className="btn-floating waves-light red bi bi-google"
                            onClick={signInWithGoogle}
                        ></button>
                    </div>
                </form>
                <hr />
                <h6>don't have an account? <Link to="/Register" className="link-register">Register</Link></h6>
            </div>
        </div>
    )
}

export default Login
