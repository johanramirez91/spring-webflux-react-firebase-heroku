import React, { useState } from 'react';
import firebase from 'firebase';
import "firebase/firestore";
import "firebase/auth";
import { login } from '../actions/authActions';
import { useAuthState } from 'react-firebase-hooks/auth';
import swal from 'sweetalert';

const auth = firebase.auth();

const Register = ({ dispatch }) => {

    const [userData, setUserData] = useState({
        email: "",
        password: ""
    })

    const handleInputChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value
        })
    }

    const registerUser = (event) => {
        event.preventDefault()
        return auth.createUserWithEmailAndPassword(userData.email, userData.password)
            .then(() => {
                swal('Registered...')
            })
            .catch(() => {
                swal({
                    icon: 'error',
                    title: 'Error in register',
                    text: 'Verify your credentials'
                })
            })
    }

    const [user] = useAuthState(auth);
    if (user) {
        dispatch(login(user.email, user.uid));
    }

    return (
        <div className='col-md-12'>
            <div className='card card-container'>
                <h5>Register form</h5>
                <form onSubmit={registerUser}>
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
                        <button type="submit" className="bi bi-pencil-square waves-effect indigo darken-2 white-text btn mt-3 mb-3"> Register</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register
