import React from 'react';
import moment from 'moment';
import { ListGroupItem } from 'react-bootstrap';

const PullRequestEvent = ({ event }) => (
  <div>
    <ListGroupItem key={event.id} className="events">
      <img 
        src={event.actor.avatar_url} 
        alt='avatar'
        style={{ height: 60, width: 45 }}
      />
      <div style={{ fontWeight: 'bold' }}>Event Type: {event.type}</div>
      <div>Updated: {moment(event.created_at).startOf('day').fromNow()}</div>
      <div>Event Creator: {event.actor.login}</div>
      <div>Author Association: {event.payload.pull_request.author_association}</div>
      {event.org ? <div>Organization: {event.org && event.org.login}</div> : '' }
      <div>Repo Name: {event.repo.name}</div>
      <div>PR Title: {event.payload.pull_request.title}</div>
      <div>PR Message: {event.payload.pull_request.body}</div>
    </ListGroupItem>
  </div>
);

export default PullRequestEvent;