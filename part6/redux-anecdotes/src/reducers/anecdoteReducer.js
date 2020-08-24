import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  const upVote = (anecdote) => anecdote.id === action.data.id ?
    action.data : anecdote

  switch(action.type) {
  case 'INIT_ANECDOTES':
    return action.data
  case 'VOTE':{
    const updatedState = state.map(upVote)
    return updatedState.sort(byHigestVotes)
  }
  case 'NEW_ANECDOTE':
    return [...state, action.data]
  default:
    return state
  }
}

const byHigestVotes = (a, b) => b.votes - a.votes

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    anecdotes.sort(byHigestVotes)
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.addAnecdote(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const createVote = (anecdote) => {
  return async dispatch => {
    anecdote.votes++
    const upVotedAnecdote = await anecdoteService.update(anecdote)
    dispatch({
      type: 'VOTE',
      data: upVotedAnecdote
    })
  }
}

export default reducer