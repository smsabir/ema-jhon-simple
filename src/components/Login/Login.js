import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { handleGoogleSignIn, initializeLoginFramework, handleSignOut, handleFbSignIn, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './LoginManager';

function Login() {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        photo: ''
    })

    initializeLoginFramework();    
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const googleSignIn = () => {
        handleGoogleSignIn()
        .then(res => {
            handleResponse(res, true);
        });
    }

    const signOut = () => {
        handleSignOut()
        .then(res => {
            handleResponse(res, false);
        });
    }

    const fbSignIn = () => {
        handleFbSignIn()
        .then(res => {
            handleResponse(res, true);
        });
    }

    
    const handleBlurField = (event) => {
        let isFieldValid = true;
        if (event.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
        }
        if (event.target.name === 'password') {
            const isPasswordValid = event.target.value.length > 6 && /\d{1}/.test(event.target.value);
            isFieldValid = isPasswordValid;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo);
        }
    }

    const handleResponse = (res, redirect) => {
        setUser(res);
        setLoggedInUser(res);
        redirect? history.replace(from) : history.replace();
    }
    const handleSubmit = (e) => {
        // console.log(user.name, user.email, user.password);
        if (newUser && user.name && user.password) {
           createUserWithEmailAndPassword(user.name, user.email, user.password)
           .then(res => {
            handleResponse(res, true);
           })
        }

        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
            .then(res => {
                handleResponse(res, true);
            })
        }   
        e.preventDefault();
    }

    return (
        <div style={{textAlign: 'center'}}>
            {
                user.isSignedIn ? <button onClick={signOut}>Sign Out</button> :
                    <button onClick={googleSignIn}>Sign in</button>
            }
            <br />
            <button onClick={fbSignIn}>Sign In using Facebook</button>
            {
                user.isSignedIn && <div>
                    <p>Welcome, {user.name}</p>
                    <p>Your email: {user.email}</p>
                    <img src={user.photo} alt="" />
                </div>
            }
            <h1>Our own Authentication</h1>
            <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
            <label htmlFor="newUser">New User Signup</label>
            <form onSubmit={handleSubmit}>
                {
                    newUser && <input name="name" type="text" onBlur={handleBlurField} placeholder="Your Name" required />
                }
                <br />
                <input type="text" name="email" onBlur={handleBlurField} placeholder="your email address" required />
                <br />
                <input type="password" name="password" id="" onBlur={handleBlurField} placeholder="your password" required />
                <br />
                <input type="submit" value={newUser ? 'Sign Up' : 'Sign in'} />
            </form>
            <p style={{ color: 'red' }}>{user.error}</p>
            {
                user.success && <p style={{ color: 'green' }}>User {newUser ? "Created" : "Logged in"} Successfully!</p>
            }
        </div>
    );
}

export default Login;
