import React from 'react';
import moment from 'moment';
import { ListGroupItem, Panel } from 'react-bootstrap';

const AssociatedEvent = ({ event }) => (
  <ListGroupItem key={event.id} className="events">
    <span className="content-img">
      <img src={event.actor.avatar_url} alt='avatar' className="feed-img" />
    </span>
    <span className="content">
      <b className="content-user">@{event.actor.login}</b><span className="content-break">|</span>
      <i className="content-updated">{moment(event.payload.issue.updated_at).startOf('day').fromNow()}</i>
      <span className="content-break">|</span>
      Associated Event
      <div><b>Author Association:</b> {event.payload.issue.author_association}</div>
      {event.org ? <div><b>Organization:</b> {event.org && event.org.login}</div> : '' }
      <div><b>Repo Name:</b> {event.repo.name}</div>
      <div><b>Issue Title:</b> {event.payload.issue.title}</div>
      <div><b>Issue URL:</b> <a href={event.payload.issue.html_url}>Visit Issue on Github</a></div>
      <Panel eventKey="1" className="message-ext">
        <Panel.Title toggle>View Issue Message</Panel.Title>
        <Panel.Body collapsible>
          {event.payload.issue.body}
        </Panel.Body>
      </Panel>
    </span>
  </ListGroupItem>
);

export default AssociatedEvent;