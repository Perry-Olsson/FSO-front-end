import React from 'react'
import { useSelector, useDispatch } from 'react-redux'


const App = () => {
    const dispatch = useDispatch()
    const votes = useSelector(state => state)

    const vote = (type) => {
        dispatch({ type })
    }

    return (
        <div>
          <button onClick={() => vote('GOOD')}>good</button> 
          <button onClick={() => vote('OK')}>neutral</button> 
          <button onClick={() => vote('BAD')}>bad</button>
          <button onClick={() => vote('ZERO')}>reset stats</button>
          <div>good {votes.good}</div>
          <div>neutral {votes.ok}</div>
          <div>bad {votes.bad}</div>
        </div>
      )
}

export default App