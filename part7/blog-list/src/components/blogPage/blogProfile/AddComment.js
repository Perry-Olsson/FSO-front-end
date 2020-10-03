import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const AddComment = ({ createComment, toggleVisibility }) => {
  const [comment, setComment] = useState('');

  const addCommentAndToggleForm = (event, comment) => {
    event.preventDefault();
    createComment(comment);
    toggleVisibility();
  };

  return (
    <form onSubmit={event => addCommentAndToggleForm(event, comment)}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <input
          type="text"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <Button
          variant="dark"
          size="sm"
          style={{ margin: '.5em 0' }}
          type="submit"
        >
          add comment
        </Button>
      </div>
    </form>
  );
};

export default AddComment;
