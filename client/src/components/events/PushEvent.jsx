import React from 'react';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.css'

import { ListGroupItem } from 'react-bootstrap';

const PushEvent = ({ event }) => (
  <ListGroupItem key={event.id} className="events">
    <span className="content-img">
      <img src={event.actor.avatar_url} alt='avatar' className="feed-img" />
      <b className="content-user">@{event.actor.login}</b>
    </span>
    <span className="content">
      <span className="push-event-label">Push Event</span>
      <span className="content-break">|</span>
      <i className="content-updated">{moment(event.created_at).startOf('hour').fromNow()}</i>
      <span className="content-break">|</span>
      <span className="repo-name">{event.repo.name.charAt(0)}</span>
      {event.org ? <div><b>Organization: </b>{event.org && event.org.login}</div> : '' }
      <div><b>Author: </b>{event.payload.commits[0].author.name}</div>
      <div><b>Info: </b>{event.payload.commits[0].message}</div>
    </span>
  </ListGroupItem>
);

export default PushEvent;