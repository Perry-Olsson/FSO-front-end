import React from 'react'

const Anecdote = ({ anecdote }) => (
  <div>
    <h1>{anecdote.content}</h1>
    <p>up Votes: {anecdote.votes}</p>
    <p>author: {anecdote.author}</p>
    <p>for more info visit <a href={`${anecdote.info}`}>{anecdote.info}</a></p>
  </div>
)

export default Anecdote