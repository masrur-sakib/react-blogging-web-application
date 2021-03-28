import React, { useContext } from "react";
import { blogContext } from "../../App";
import "./CreateNewPost.css";

const CreateNewPost = () => {
  const { postContent, setPostContent, submitPost } = useContext(blogContext);
  return (
    <div className="new-posts-section">
      <h4 className="mb-3 text-center">Create a New Post</h4>
      <form>
        <textarea
          className="new-post-textarea"
          type="text"
          rows="5"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          placeholder="What's on your mind?"
        />
        <button type="button" className="btn btn-primary" onClick={submitPost}>
          Post
        </button>
      </form>
    </div>
  );
};

export default CreateNewPost;
