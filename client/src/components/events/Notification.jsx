import React from 'react';
import moment from 'moment';
import { ListGroupItem } from 'react-bootstrap';

const Notification = ({ notification }) => (
  <div>
    {/* <h3>Notifications for repos you are following or watching</h3> */}
    {/* {console.log('notifications', notifications)} */}
    <ListGroupItem key={notification.id} className="events">
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
  </div>
);

export default Notification;