import React from 'react';
import moment from 'moment';
import { ListGroupItem } from 'react-bootstrap';

const RepoEvent = ({ event }) => (
  <div>
    <ListGroupItem key={event.id}>
      <img 
        src={event.actor.avatar_url} 
        alt='avatar'
        style={{ height: 60, width: 45 }}
      />
      <div style={{ fontWeight: 'bold' }}>Event Type: {event.type}</div>
      <div>Published At: {moment(event.published_at).startOf('day').fromNow()}</div>
      <div>Event Creator: {event.author.login}</div>
      <div>Author Association: {event.payload.issue.author_association}</div>
      {event.org ? <div>Organization: {event.org && event.org.login}</div> : '' }
      <div>Repo Name: {event.repo.name}</div>
      <div>Release Info: {event.release.tag_name}</div>
    </ListGroupItem>
  </div>
);

export default RepoEvent;