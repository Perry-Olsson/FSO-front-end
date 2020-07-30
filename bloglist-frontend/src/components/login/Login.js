import React from 'react'
import './Login.css'

const Login = ({username, setUsername, password, setPassword, handleLogin }) => (
    <div>
        <form onSubmit={handleLogin}>
          <div>
            <label>username</label>
            <input
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            <label>password</label>
            <input
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
            />
          </div>  
          <button className='login' type='submit'>login</button>
        </form>
    </div>
)

export default Login