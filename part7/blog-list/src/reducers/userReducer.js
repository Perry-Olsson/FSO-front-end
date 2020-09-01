import blogService from '../services/blogs'
import loginService from '../services/login'
import { createNotification } from './notificationReducer'

const userReducer = (state = null, action) => {
  switch(action.type) {
  case 'LOGIN':
    return action.user
  case 'SET':
    return action.user
  case 'LOGOUT':
    return null
  default:
    return state
  }
}

export const setUser = (user) => {
  blogService.setToken(user.token)
  return {
    type: 'SET',
    user
  }
}

export const loginUser = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch({
        type: 'LOGIN',
        user
      })
      dispatch(createNotification({ type: 'success', message: 'login successful' }, 5))
    } catch(exception) {
      dispatch(createNotification({ type: 'failure', message: exception.response.data.error }, 5))
    }
  }
}

export const logoutUser = () => {
  window.localStorage.removeItem('loggedUser')
  return {
    type: 'LOGOUT'
  }
}

export default userReducer