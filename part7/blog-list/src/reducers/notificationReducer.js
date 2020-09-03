let messageId = null

const notificationReducer = (state = null, action) => {
  switch(action.type) {
  case 'NOTIFY':
    return  action.notification
  case 'WIPE':
    return null
  default:
    return state
  }
}

export const createNotification = (notification, time) => {
  return async dispatch => {
    clearTimeout(messageId)
    dispatch({
      type: 'NOTIFY',
      notification
    })
    messageId = setTimeout(() => {
      dispatch({ type: 'WIPE' })
    }, time * 1000)
  }
}

export const clearNotification = () => {
  return async dispatch => {
    clearTimeout(messageId)
    dispatch({ type: 'WIPE' })
  }
}

export default notificationReducer