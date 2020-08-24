import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createVote } from '../reducers/anecdoteReducer.js'
import { createNotification, wipeNotification } from '../reducers/notificationReducer'
import Anecdote from './Anecdote'
import Filter from './Filter'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const filterRegExp = new RegExp(`${filter}`, 'gmi')
  const filteredAnecdotes = anecdotes.filter(anecdote => anecdote.content.match(filterRegExp))

  const vote = (id, anecdote) => {
    dispatch(createVote(id))
    dispatch(createNotification(`you voted '${anecdote}'`))
    setTimeout(() => {
      dispatch(wipeNotification())
    }, 5000)
  }

  return (
    <>
      <Filter />
      {
        filteredAnecdotes.map(anecdote =>
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            vote={vote}
          />)}
    </>
  )
}

export default AnecdoteList