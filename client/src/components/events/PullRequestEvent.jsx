import React from 'react';
import moment from 'moment';
import { ListGroupItem } from 'react-bootstrap';

const PullRequestEvent = ({ event }) => (
  <div>
    <ListGroupItem key={event.id} className="events">
      <img 
        src={event.actor.avatar_url} 
        alt='avatar'
        className="feedImage"
      />
      <div className="reason">Pull Request Event</div>
      <div><b>Updated: </b>{moment(event.created_at).startOf('day').fromNow()}</div>
      <div><b>Event Creator: </b>{event.actor.login}</div>
      <div><b>Author Association: </b>{event.payload.pull_request.author_association}</div>
      {event.org ? <div><b>Organization: </b>{event.org && event.org.login}</div> : '' }
      <div><b>Repo Name: </b>{event.repo.name}</div>
      <div><b>PR Title: </b>{event.payload.pull_request.title}</div>
      <div><b>PR Message: </b>{event.payload.pull_request.body}</div>
    </ListGroupItem>
  </div>
);

export default PullRequestEvent;