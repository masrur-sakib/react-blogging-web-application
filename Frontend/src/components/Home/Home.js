import React, { useContext } from "react";
import { blogContext } from "../../App";
import CreateNewPost from "../CreateNewPost/CreateNewPost";
import Post from "../Post/Post";
import "./Home.css";

const Home = () => {
  const { allPosts } = useContext(blogContext);
  return (
    <div className="container">
      <div className="content-section">
        <CreateNewPost />
        <h4 className="mt-3">Recent Posts</h4>
        {allPosts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;
