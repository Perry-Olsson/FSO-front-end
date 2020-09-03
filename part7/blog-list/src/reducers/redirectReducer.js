const redirectReducer = (state = null, action) => {
  switch(action.type) {
  case 'REDIRECT':
    return action.to
  case 'WIPE':
    return null
  default:
    return state
  }
}

export const redirect = (to) => {
  return {
    type: 'REDIRECT',
    to
  }
}

export const wipe = () => {
  return {
    type: 'WIPE'
  }
}

export default redirectReducer