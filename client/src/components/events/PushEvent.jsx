import React from 'react';
import moment from 'moment';
import { ListGroupItem } from 'react-bootstrap';

const PushEvent = ({ event }) => (
  <div>
    <ListGroupItem key={event.id} className="events">
      <img 
        src={event.actor.avatar_url} 
        alt='avatar'
        className="feedImage"
      />
      <div className="reason">Push Event</div>
      <div><b>Updated: </b>{moment(event.created_at).startOf('day').fromNow()}</div>
      <div><b>Event Creator: </b>{event.actor.login}</div>
      {event.org ? <div><b>Organization: </b>{event.org && event.org.login}</div> : '' }
      <div><b>Repo Name: </b>{event.repo.name}</div>
      <div><b>Author: </b>{event.payload.commits[0].author.name}</div>
      <div><b>Message: </b>{event.payload.commits[0].message}</div>
    </ListGroupItem>
  </div>
);

export default PushEvent;