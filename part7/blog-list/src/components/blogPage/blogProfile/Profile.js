import React from 'react';
import { useSelector } from 'react-redux';
import LikeButton from './LikeButton';
import { Button } from 'react-bootstrap';
import './blogProfile.css';

const Profile = ({ blog, confirmDeletion }) => {
  const user = useSelector(state => state.user);
  return (
    <>
      <h2>{blog.title}</h2>
      <iframe title={blog.title} src={blog.url} className="embeddedBlog" />
      <div className="likeButtonDiv">
        <a href={blog.url} rel="noopener noreferrer" target="_blank">
          <Button variant="outline-dark">visit page</Button>
        </a>
        <div>
          {user ? (
            <LikeButton blog={blog} user={user} />
          ) : (
            <span style={{ margin: '0 1em' }}></span>
          )}
          {blog.likes} likes
        </div>
      </div>
      <p>
        added by <b>{blog.user.username}</b>
      </p>
      {user && user.username === blog.user.username && (
        <Button className="delete" onClick={confirmDeletion}>
          Delete
        </Button>
      )}
    </>
  );
};

export default Profile;
