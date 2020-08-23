import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createVote } from '../reducers/anecdoteReducer.js'
import Anecdote from './Anecdote'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    const vote = (id) => { dispatch(createVote(id)) }

    return (
        <>
          {anecdotes.map(anecdote => 
          <Anecdote 
          key={anecdote.id}
          anecdote={anecdote} 
          vote={vote}    
          />)}
        </>
    )
}

export default AnecdoteList