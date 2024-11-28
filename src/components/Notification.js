import React from 'react';
import './Notification.css'; // Add styles for the notification

const Notification = ({ message, type, onClose }) => {
  if (!message) return null;

  return (
    <div className={`notification ${type}`}>
      <span>{message}</span>
      <button onClick={onClose}>✖</button>
    </div>
  );
};

export default Notification;
