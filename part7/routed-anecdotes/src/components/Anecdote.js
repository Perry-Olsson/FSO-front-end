import React from 'react'

const Anecdote = ({ anecdote }) => (
  <div>
    <h2>{anecdote.content}</h2>
    <p>Has {anecdote.votes} votes</p>
    <p>Author: {anecdote.author}</p>
    <p>For more info visit <a href={anecdote.info}>{anecdote.info}</a></p>
  </div>
)

export default Anecdote