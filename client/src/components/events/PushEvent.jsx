import React from 'react';
import moment from 'moment';
import { ListGroupItem } from 'react-bootstrap';

const PushEvent = ({ event }) => (
  <div>
    <ListGroupItem key={event.id} className="events">
      <img 
        src={event.actor.avatar_url} 
        alt='avatar'
        style={{ height: 60, width: 45 }}
      />
      <div style={{ fontWeight: 'bold' }}>Push Event</div>
      <div>Updated: {moment(event.created_at).startOf('day').fromNow()}</div>
      <div>Event Creator: {event.actor.login}</div>
      {event.org ? <div>Organization: {event.org && event.org.login}</div> : '' }
      <div>Repo Name: {event.repo.name}</div>
      <div>Author: {event.payload.commits[0].author.name}</div>
      <div>Message: {event.payload.commits[0].message}</div>
    </ListGroupItem>
  </div>
);

export default PushEvent;