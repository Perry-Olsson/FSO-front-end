import React from 'react';
import { useSelector } from 'react-redux';
import Togglable from '../../togglable/Togglable';
import AddComment from './AddComment';
import { Button } from 'react-bootstrap';

const CommentSection = ({ blog, del, createComment }) => {
  const user = useSelector(state => state.user);
  return (
    <>
      <div>
        <h4>Comments:</h4>
        <ul>
          {blog.comments.map((comment, i) => (
            <li key={i}>
              {comment.comment}
              {user && user.username === comment.user && (
                <Button
                  variant="outline-danger"
                  onClick={() => del(comment.id)}
                  style={{ width: 'fit-content', marginLeft: '1em' }}
                >
                  delete
                </Button>
              )}
            </li>
          ))}
        </ul>
      </div>
      {user && (
        <Togglable buttonLabel="Comment" visible={false} size="sm">
          <AddComment createComment={createComment} />
        </Togglable>
      )}
    </>
  );
};
export default CommentSection;
