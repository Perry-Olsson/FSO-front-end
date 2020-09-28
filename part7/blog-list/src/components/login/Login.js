import React, { useState } from 'react';
import { loginUser } from '../../reducers/userReducer';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import './Login.css';

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async event => {
    event.preventDefault();
    dispatch(loginUser(username, password));
    setUsername('');
    setPassword('');
  };

  return (
    <div className="loginForm-cy">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>username</label>
          <input
            id="loginUsername"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label>password</label>
          <input
            id="loginPassword"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button id="loginButton" className="login" type="submit" variant="dark">
          login
        </Button>
      </form>
    </div>
  );
};

export default Login;
