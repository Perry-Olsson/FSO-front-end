import React from "react";
import "./notification.css";

const Notification = ({ message = null, type }) => {
  if (message === null) return null;

  return <div className={`${type} notification`}>{message}</div>;
};

export default Notification;
