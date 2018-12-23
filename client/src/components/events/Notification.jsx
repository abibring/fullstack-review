import React from 'react';
import moment from 'moment';
import { ListGroupItem } from 'react-bootstrap';

const Notification = ({ notification }) => (
  <ListGroupItem key={notification.id} className="events">
    <b className="content-img">@{notification.repository.owner.login}</b>
    <span className="content-break">|</span>
    <i className="content-updated">{moment(notification.updated_at).startOf('day').fromNow()}</i>
    <span className="content-break">|</span>
    <span>{notification.reason.charAt(0).toUpperCase() + notification.reason.replace('_', ' ').slice(1)}</span>
    <div style={{ paddingTop: 10 }}>
      <div className="repo-name"><b>Repo: </b>{notification.repository.name}</div>
      <div><b></b>Notification Viewed: <b>{notification.unread.toString()}</b></div>
      <div><b>Notification Title: </b>{notification.subject.title}</div>
      <div><b>Notification Type: </b>{notification.subject.type}</div>
      <div><b>Notification Type: </b>{notification.subject.type}</div>
      <div><a href={notification.repository.html_url} className="event-link">Click To Visit Repo</a></div>
    </div>
  </ListGroupItem>
);

export default Notification;