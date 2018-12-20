import React from 'react';
import moment from 'moment';
import { ListGroupItem, Panel } from 'react-bootstrap';

const PushEvent = ({ event }) => (
  <ListGroupItem key={event.id} className="events">
    <span className="content-img">
      <img src={event.actor.avatar_url} alt='avatar' className="feed-img" />
    </span>
    <span className="content">
      <b className="content-user">@{event.actor.login}</b>
      <span className="content-break">|</span>
      <i className="content-updated">{moment(event.created_at).startOf('day').fromNow()}</i>
      <span className="content-break">|</span>
      <span className="push-event-label">Push Event</span>
      {event.org ? <div><b>Organization: </b>{event.org && event.org.login}</div> : '' }
      <div><b>Repo Name: </b>{event.repo.name}</div>
      <div><b>Author: </b>{event.payload.commits[0].author.name}</div>
      {/* <div><b>Message: </b>{event.payload.commits[0].message}</div> */}
      <Panel eventKey="1" className="message-ext">
        <Panel.Title toggle>View Issue Message</Panel.Title>
        <Panel.Body collapsible>
          {event.payload.commits[0].message}
        </Panel.Body>
      </Panel>
    </span>
  </ListGroupItem>
);

export default PushEvent;