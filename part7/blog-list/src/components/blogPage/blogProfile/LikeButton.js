import React from 'react';
import { useLikeBlog } from '../../../hooks/index';
import { Button } from 'react-bootstrap';

const LikeButton = ({ blog }) => {
  const like = useLikeBlog(blog);
  return (
    <Button
      variant="outline-info"
      style={{ margin: '0 1em', width: 'fit-content' }}
      onClick={like}
    >
      like
    </Button>
  );
};

export default LikeButton;
