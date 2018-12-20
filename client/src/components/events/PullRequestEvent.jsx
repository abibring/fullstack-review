import React from 'react';
import moment from 'moment';
import { ListGroupItem, Panel } from 'react-bootstrap';

const PullRequestEvent = ({ event }) => (
  <ListGroupItem key={event.id} className="events">
    <span className="content-img">
      <img src={event.actor.avatar_url} alt='avatar'className="feed-img" />
    </span>
    <span className="content">
      <b className="content-user">@{event.actor.login}</b>
      <span className="content-break">|</span>
      <i className="content-updated">{moment(event.created_at).startOf('day').fromNow()}</i>
      <span className="content-break">|</span>
      <span className="pull-event-label">Pull Request Event</span>
      <div><b>Author Association: </b>{event.payload.pull_request.author_association}</div>
      {event.org ? <div><b>Organization: </b>{event.org && event.org.login}</div> : '' }
      <div><b>Repo Name: </b>{event.repo.name}</div>
      <div><b>PR Title: </b>{event.payload.pull_request.title}</div>
      {/* <div><b>PR Message: </b>{event.payload.pull_request.body}</div> */}
      <Panel eventKey="1" className="message-ext">
        <Panel.Title toggle>View Issue Message</Panel.Title>
        <Panel.Body collapsible>
          {event.payload.pull_request.body}
        </Panel.Body>
      </Panel>
    </span>
  </ListGroupItem>
);

export default PullRequestEvent;