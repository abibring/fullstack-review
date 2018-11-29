import React from 'react';
import moment from 'moment';
import { ListGroupItem } from 'react-bootstrap';

const RepoEvent = ({ event }) => (
  <div>
    <ListGroupItem key={event.id} className="events">
      <img 
        src={event.actor.avatar_url} 
        alt='avatar'
        className="feedImage"
      />
      <div className="reason">Repository Event</div>
      <div><b>Published At:</b>{moment(event.published_at).startOf('day').fromNow()}</div>
      <div><b>Event Creator:</b>{event.author.login}</div>
      <div><b>Author Association: </b>{event.payload.issue.author_association}</div>
      {event.org ? <div><b>Organization: </b>{event.org && event.org.login}</div> : '' }
      <div><b>Repo Name: </b>{event.repo.name}</div>
      <div><b>Release Info: </b>{event.release.tag_name}</div>
    </ListGroupItem>
  </div>
);

export default RepoEvent;