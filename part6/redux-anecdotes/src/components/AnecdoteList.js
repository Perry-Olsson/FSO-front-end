import React from 'react'
import { connect } from 'react-redux'
import { createVote } from '../reducers/anecdoteReducer.js'
import { setNotification } from '../reducers/notificationReducer'
import Anecdote from './Anecdote'
import Filter from './Filter'

const AnecdoteList = (props) => {
  const filterRegExp = new RegExp(`${props.filter}`, 'gmi')
  const filteredAnecdotes = props.anecdotes.filter(anecdote => anecdote.content.match(filterRegExp))

  const vote = (anecdote) => {
    props.createVote(anecdote)
    props.setNotification(`you voted '${anecdote.content}'`, 5)
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

export default connect(mapStateToProps, { createVote, setNotification })(AnecdoteList)