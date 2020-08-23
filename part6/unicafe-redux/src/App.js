import React from 'react'
import { useSelector, useDispatch } from 'react-redux'


const App = () => {
    const dispatch = useDispatch()
    const votes = useSelector(state => state)

    const send = (type) => {
        dispatch({ type })
    }

    return (
        <div>
          <button onClick={() => send('GOOD')}>good</button> 
          <button onClick={() => send('OK')}>neutral</button> 
          <button onClick={() => send('BAD')}>bad</button>
          <button onClick={() => send('ZERO')}>reset stats</button>
          <div>good {votes.good}</div>
          <div>neutral {votes.ok}</div>
          <div>bad {votes.bad}</div>
        </div>
      )
}

export default App