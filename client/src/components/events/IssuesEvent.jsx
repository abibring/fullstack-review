import React from 'react';
import moment from 'moment';
import { ListGroupItem } from 'react-bootstrap';

const IssuesEvent = ({ event }) => (
  <div>
    {/* {console.log('IssuesEvent', event)} */}
    <ListGroupItem key={event.id} className="events">
      <img src={event.actor.avatar_url} alt='avatar' className="feedImage" />
      <div className="reason">Issue Event</div>
      <div><b>Updated At:</b> {moment(event.payload.issue.updated_at).startOf('day').fromNow()}</div>
      <div><b>Event Creator:</b> {event.actor.login}</div>
      <div><b>Author Association:</b> {event.payload.issue.author_association}</div>
      {event.org ? <div><b>Organization:</b> {event.org && event.org.login}</div> : '' }
      <div><b>Repo Name:</b> {event.repo.name}</div>
      <div><b>Issue Title:</b> {event.payload.issue.title}</div>
      <div><b>Issue Message:</b> {event.payload.issue.body}</div>
      <div><b>Issue URL:</b> <a href={event.payload.issue.html_url}>Visit Issue on Github</a></div>
    </ListGroupItem>
  </div>
);

export default IssuesEvent;