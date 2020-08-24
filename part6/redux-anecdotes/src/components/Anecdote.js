import React from 'react'

const Anecdote = ({ anecdote, vote }) => (
  <div key={anecdote.id}>
    <div>
      {anecdote.content}
    </div>
    <div>
    has {anecdote.votes}
      <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
    </div>
  </div>
)

export default Anecdote