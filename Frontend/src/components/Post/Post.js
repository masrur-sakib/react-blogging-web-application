import React from "react";
import "./Post.css";

const Post = (props) => {
  const { img, name, time, postContent } = props.post;
  return (
    <>
      {props.post.name ? (
        <div className="post-section">
          <div className="post-top-section">
            <img src={img} alt="user-avatar" />
            <div>
              <p className="user-name">
                <strong>{name}</strong>
              </p>
              <p className="post-time">
                {new Date(parseInt(time)).toLocaleString()}
              </p>
            </div>
          </div>
          <div className="post-content-section">
            <p>{postContent}</p>
          </div>
          <div className="post-feedback-section">
            <div className="row">
              <div className="col feedback-upvote-section">
                <p>UpVote</p>
              </div>
              <div className="col feedback-downvote-section">
                <p>DownVote</p>
              </div>
              <div className="col feedback-comment-section">
                <p>Comment</p>
              </div>
            </div>
          </div>
          <div className="post-feedback-section">
            <p className="comments-title">Comments:</p>
            <form>
              <input
                className="comment-input"
                type="text"
                placeholder="write a comment ..."
              />
              <button type="submit" hidden />
            </form>
            <div></div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Post;
