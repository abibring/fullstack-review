import React from 'react';
import moment from 'moment';
import { ListGroupItem } from 'react-bootstrap';

const IssueCommentEvent = ({ event }) => (
  <ListGroupItem key={event.id} className="events">
    <span className="content-img">
      <img src={event.actor.avatar_url} alt='avatar' className="feed-img" />
    </span>
    <span className="content">
      <b className="content-user">@{event.actor.login}</b>
      <span className="content-break">|</span>
      <i className="content-updated">{moment(event.payload.issue.updated_at).startOf('day').fromNow()}</i>
      <span className="content-break">|</span>
      Issue Comment Event
      <div><b>Repo Name: </b>{event.repo.name}</div>
      <div><b>Author Association: </b>{event.payload.issue.author_association}</div>
      {event.org ? <div><b>Organization: </b>{event.org && event.org.login}</div> : '' }
      <div><b>Issue Comment Title: </b>{event.payload.issue.title}</div>
      <div><b>Issue Comment Message: </b>{event.payload.issue.body}</div>
      <div><b>Issue Comment URL: </b><a href={event.payload.issue.html_url}>Visit Issue on Github</a></div>
    </span>
  </ListGroupItem>
);

export default IssueCommentEvent;