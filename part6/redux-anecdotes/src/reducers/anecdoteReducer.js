const reducer = (state = [], action) => {
  const upVote = (anecdote) => anecdote.id === action.data.id ?
    { ...anecdote, votes: anecdote.votes + 1 } : anecdote

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

export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: content
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  }
}

export const createVote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export default reducer