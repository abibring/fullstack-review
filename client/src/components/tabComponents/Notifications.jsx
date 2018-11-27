import React, { Component } from 'react';
import { ListGroupItem, ListGroup } from 'react-bootstrap';

const Notifications = ({ notifications }) => (
  <div>
    <h3>Notifications for repos you are following or watching</h3>
    {console.log('notifications', notifications)}
    <ListGroup>
      {notifications.map(notification => (
        <ListGroupItem>
          <div>Notification Reason: {notification.reason}</div>
          <div>Notification Type: {notification.subject.type}</div>
          <div>Repo: {notification.full_name}</div>
        </ListGroupItem>
      ))}
    </ListGroup>
  </div>
);

export default Notifications;