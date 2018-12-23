import React from 'react';
import moment from 'moment';
import { ListGroupItem } from 'react-bootstrap';

const AssociatedEvent = ({ event }) => (
  <ListGroupItem key={event.id} className="events">
    <span className="content-img">
      <img src={event.actor.avatar_url} alt='avatar' className="feed-img" />
      <b className="content-user">@{event.actor.login}</b><span className="content-break">|</span>
    </span>
    <span className="content">
      <i className="content-updated">{moment(event.payload.issue.updated_at).startOf('day').fromNow()}</i>
      <span className="content-break">|</span>
      Associated Event
      <div><b>Author Association:</b> {event.payload.issue.author_association}</div>
      {event.org ? <div><b>Organization:</b> {event.org && event.org.login}</div> : '' }
      <span className="repo-name"><b>Repo:</b> {event.repo.name}</span>
      <div><b>Issue Title:</b> {event.payload.issue.title}</div>
      <div><b>Issue URL:</b> <a href={event.payload.issue.html_url} className="event-link">Visit Issue on Github</a></div>
      <div><b>Info:</b>{event.payload.issue.body}</div>
    </span>
  </ListGroupItem>
);

export default AssociatedEvent;


