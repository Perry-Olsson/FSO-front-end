import React from 'react';
import { useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';
import './notification.css';

const Notification = () => {
  const notification = useSelector(state => state.notification);
  return notification ? (
    <Alert variant={notification.type}>{notification.message}</Alert>
  ) : null;
};

export default Notification;
