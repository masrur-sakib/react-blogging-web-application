import React, { useContext } from "react";
import "./Header.css";
import { blogContext } from "../../App";
import firebase from "firebase";
import { Link } from "react-router-dom";

const Header = () => {
  const { isSignedIn } = useContext(blogContext);
  return (
    <div className="header">
      <div className="container header-content">
        <div className="header-left-section">
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <h4>Blogging Site</h4>
          </Link>
        </div>
        {isSignedIn ? (
          <div className="header-right-section">
            <img src={firebase.auth().currentUser.photoURL} alt="user-avatar" />
            <h4 className="user-name">
              {firebase.auth().currentUser.displayName.slice(0, 10) + " .."}
            </h4>
            <Link to="/login">
              <button className="btn btn-danger">Sign out</button>
            </Link>
          </div>
        ) : (
          <div className="header-right-section">
            <Link to="/login">
              <button className="btn btn-primary">Sign in</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
