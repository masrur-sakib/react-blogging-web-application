import React, { useContext, useEffect } from "react";
import { blogContext } from "../../App";
import "./Login.css";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

firebase.initializeApp({
  apiKey: "AIzaSyDLczHdCfQyI11q1DQZw0D8gCE0G0wsxJI",
  authDomain: "react-blogging-site.firebaseapp.com",
});

const Login = () => {
  const { isSignedIn, setIsSignedIn } = useContext(blogContext);

  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      // signInSuccess: () => false,
      signInSuccessWithAuthResult: () => false,
    },
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setIsSignedIn(!!user);
    });
  }, []);
  return (
    <div className="login-page">
      {isSignedIn ? (
        <div className="login-section">
          <h4 className="text-center">Welcome </h4>
          <div>
            <h4 className="user-name">
              {firebase.auth().currentUser.displayName}
            </h4>
          </div>
          <div>
            <button
              className="btn btn-danger"
              onClick={() => firebase.auth().signOut()}
            >
              Sign out
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h4>Sign In</h4>
          <StyledFirebaseAuth
            className="signIn-google"
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </div>
      )}
    </div>
  );
};

export default Login;
