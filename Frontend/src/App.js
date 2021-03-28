import { createContext, useEffect, useState } from "react";
import "./App.css";
import firebase from "firebase";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import axios from "./axios";
import Pusher from "pusher-js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export const blogContext = createContext();

const pusher = new Pusher("4ced851d93703be5a4d8", {
  cluster: "ap2",
});

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const [postContent, setPostContent] = useState("");
  const submitPost = () => {
    uploadPost({
      name: firebase.auth().currentUser.displayName,
      img: firebase.auth().currentUser.photoURL,
      time: Date.now(),
      postContent: postContent,
    });
    setPostContent("");
  };

  const uploadPost = async (newPost) => {
    await axios.post("/upload/post", newPost).then((response) => {
      // console.log(response);
    });
  };

  const submitComment = (e) => {
    e.preventDefault();
    // console.log("Comment Submitted");
  };

  const retrievePosts = () => {
    axios.get("/retrieve/posts").then((response) => {
      // console.log(response.data);
      setAllPosts(response.data);
    });
  };

  useEffect(() => {
    const channel = pusher.subscribe("posts");
    channel.bind("inserted", function (data) {
      retrievePosts();
    });
  }, []);

  useEffect(() => {
    retrievePosts();
  }, []);

  return (
    <blogContext.Provider
      value={{
        isSignedIn,
        setIsSignedIn,
        postContent,
        setPostContent,
        submitPost,
        submitComment,
        allPosts,
      }}
    >
      <Router>
        <Header></Header>
        <Switch>
          <Route exact path="/">
            {isSignedIn ? <Home></Home> : <Login />}
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
        </Switch>
      </Router>
    </blogContext.Provider>
  );
}

export default App;
