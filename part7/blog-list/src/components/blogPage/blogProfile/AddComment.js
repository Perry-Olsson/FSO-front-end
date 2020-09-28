import React, { useState } from 'react'
import { Button } from 'react-bootstrap'

const AddComment = ({ createComment }) => {
  const [comment, setComment] = useState('')

  return (
    <form onSubmit={(event) => createComment(event, comment)}>
      {/* <label>Comment</label> */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <input type='text' value={comment} onChange={({ target }) => setComment(target.value)}/>
        <Button variant="dark" size='sm' style={{ margin: '.5em 0' }}>add comment</Button>
      </div>
    </form>
  )

}

export default AddComment