import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework = () => {
    !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
}

export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
        .then((res) => {
            const { displayName, photoURL, email } = res.user;
            const signedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
                success: true
            }
            setUserToken();
            return signedInUser;
            // console.log(displayName, email, photoURL)

        })
        .catch(error => {
            console.log(error);
            console.log(error.message);
        })
}

const setUserToken = () => {
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
    .then(function(idToken) {
        sessionStorage.setItem('token', idToken);
        // Send token to your backend via HTTPS
        // ...
      }).catch(function(error) {
        // Handle error
      });
}

export const handleFbSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth()
        .signInWithPopup(fbProvider)
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            const credential = result.credential;
            user.success = true;

            // The signed-in user info.
            const user = result.user;
            
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            const accessToken = credential.accessToken;
            console.log("fb user: ", user);
            return user;

            // ...
        })
        .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            console.log(errorCode, errorMessage)
            // ...
        });
}

export const handleSignOut = () => {

     return firebase.auth().signOut()
        .then(res => {
            const signedOutUser = {
                isSignedIn: false,
                newUser: false,
                name: '',
                photo: '',
                email: '',
                error: '',
                success: false
            }
            return signedOutUser;
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
}

export const createUserWithEmailAndPassword = (name, email, password) =>{
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((res) => {

        const newUserInfo = res.user;
        newUserInfo.error = '';
        newUserInfo.success = true;
        updateUserName(name);
        console.log("New user", res.user);
        return newUserInfo;
    })
    .catch((error) => {
        const newUserInfo = { };
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo;
    });
}

export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
                .then((res) => {
                    const newUserInfo = res.user;
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    return newUserInfo;
                })
                .catch((error) => {
                    const newUserInfo = {};
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    return newUserInfo;
                });
}

const updateUserName = name => {
    const user = firebase.auth().currentUser;
    user.updateProfile({
        displayName: name

    }).then(function () {
        // Update successful.
        console.log("user name updated")
    }).catch(function (error) {
        // An error happened.
        console.log(error);
    });
}
