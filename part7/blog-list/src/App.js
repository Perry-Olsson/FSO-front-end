import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from './reducers/blogReducer';
import { setUser } from './reducers/userReducer';
import { Switch, Route } from 'react-router-dom';
import userService from './services/users';
import Navigation from './components/navigation/Navigation';
import BlogPage from './components/blogPage/BlogPage';
import UserPage from './components/users/UserPage';
import './App.css';
import { createNotification } from './reducers/notificationReducer';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  useEffect(() => {
    dispatch(initializeBlogs());
    const loggedUser = window.localStorage.getItem('loggedUser');
    if (loggedUser) {
      let user = JSON.parse(loggedUser);
      userService
        .getLikes(user)
        .then(u => {
          dispatch(setUser(u));
        })
        .catch(e => {
          dispatch(
            createNotification({ type: 'danger', message: e.message }, 5)
          );
        });
    }
  }, [dispatch]);

  return (
    <div className="container">
      <h1 className="logo">Blogbook</h1>
      <Navigation user={user} />
      <Switch>
        <Route path="/users">
          <UserPage />
        </Route>
        <Route path="/">
          <BlogPage user={user} />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
