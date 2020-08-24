let messageId = null

const notificationReducer = (state = null, action) => {
  switch(action.type) {
  case 'NOTIFY':
    return { message: action.message, id: null }
  case 'WIPE':
    return null
  default:
    return state
  }
}

export const setNotification = (message, time) => {
  return async dispatch => {
    clearTimeout(messageId)
    dispatch({
      type: 'NOTIFY',
      message
    })
    messageId = setTimeout(() => {
      dispatch({
        type: 'WIPE'
      })
    }, time * 1000)
  }
}

export default notificationReducer