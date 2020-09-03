import React, { useState } from 'react'

const AddComment = ({ createComment }) => {
  const [comment, setComment] = useState('')

  return (
    <form onSubmit={(event) => createComment(event, comment)}>
      <label>comment:</label>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <input type='text' value={comment} onChange={({ target }) => setComment(target.value)}/>
        <button style={{ width: 'fit-content', marginTop: '.5em' }}>add comment</button>
      </div>
    </form>
  )
}

export default AddComment