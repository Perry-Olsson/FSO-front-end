import { createBrowserHistory } from 'history'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'

const reducer = (history) => combineReducers({
  router: connectRouter(history),
  notification: notificationReducer,
  blogs: blogReducer,
  user: userReducer
})

export const history = createBrowserHistory()

const store = createStore(reducer(history), composeWithDevTools(applyMiddleware(routerMiddleware(history), thunk)))

export default store