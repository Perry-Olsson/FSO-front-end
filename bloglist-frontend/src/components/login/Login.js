import React from 'react'
import PropTypes from 'prop-types'
import './Login.css'

const Login = ({ username, setUsername, password, setPassword, handleLogin }) => (
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

Login.propTypes = {
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired
}

export default Login