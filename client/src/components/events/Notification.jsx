import React from 'react';
import moment from 'moment';
import { ListGroupItem } from 'react-bootstrap';

const Notification = ({ notification }) => (
  <div>
    {/* <h3>Notifications for repos you are following or watching</h3> */}
    {/* {console.log('notifications', notifications)} */}
    <ListGroupItem key={notification.id} className="events">
      <div className="reason">Notification: {notification.reason.charAt(0).toUpperCase() + notification.reason.replace('_', ' ').slice(1)}</div>
      <div><b>Last Updated: </b>{moment(notification.updated_at).startOf('day').fromNow()}</div>
      <div><b>Repo Name: </b>{notification.repository.name}</div>
      <div><b>Repo Owner: </b>{notification.repository.owner.login}</div>
      <div><b></b>Notification Viewed: <b>{notification.unread.toString()}</b></div>
      <div><b>Notification Title: </b>{notification.subject.title}</div>
      <div><b>Notification Type: </b>{notification.subject.type}</div>
      <div><b>Repo: </b>{notification.repository.name}</div>
      <div><b>Notification Type: </b>{notification.subject.type}</div>
      <div><a href={notification.repository.html_url}>Click To Visit Repo</a></div>
    </ListGroupItem>
  </div>
);

export default Notification;