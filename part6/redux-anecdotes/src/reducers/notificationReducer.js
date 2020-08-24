const notificationReducer = (state = null, action) => {
  switch(action.type) {
  case 'NOTIFY':
    return action.message
  case 'WIPE':
    return null
  default:
    return state
  }
}

export const createNotification = (message) => {
  return {
    type: 'NOTIFY',
    message
  }
}

export const wipeNotification = () => {
  return {
    type: 'WIPE',
  }
}
export default notificationReducer