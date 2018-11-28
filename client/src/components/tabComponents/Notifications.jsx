import React from 'react';
import moment from 'moment';
import { ListGroupItem, ListGroup } from 'react-bootstrap';

const Notifications = ({ notifications }) => (
  <div>
    <h3>Notifications for repos you are following or watching</h3>
    {/* {console.log('notifications', notifications)} */}
    <ListGroup>
      {notifications.map(notification => (
        <ListGroupItem key={notification.id}>
          <div>Last Updated: {moment(notification.updated_at).startOf('day').fromNow()}</div>
          <div>Repo Name: {notification.repository.name}</div>
          <div>Repo Owner: {notification.repository.owner.login}</div>
          <div style={{ fontWeight: 'bold' }}>Notification Reason: {notification.reason}</div>
          <div>Notification Viewed: <b>{notification.unread.toString()}</b></div>
          <div>Notification Title: {notification.subject.title}</div>
          <div>Notification Type: {notification.subject.type}</div>
          <div>Repo: {notification.repository.name}</div>
          <div>Notification Type: {notification.subject.type}</div>
          <div><a href={notification.repository.html_url}>Click To Visit Repo</a></div>
        </ListGroupItem>
      ))}
    </ListGroup>
  </div>
);

export default Notifications;