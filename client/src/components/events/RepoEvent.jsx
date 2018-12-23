import React from 'react';
import moment from 'moment';
import { ListGroupItem, Panel } from 'react-bootstrap';

const RepoEvent = ({ event }) => (
    <ListGroupItem key={event.id} className="events">
      <span className="content-img">
        <img src={event.actor.avatar_url} alt='avatar' className="feed-img" />
        <b className="content-user">@{event.author.login}</b>
      </span>
      <span className="content">
        <span className="repo-event-label">Repository Event</span>
        <span className="content-break">|</span>
        <i className="content-updated">{moment(event.published_at).startOf('day').fromNow()}</i>
        <span className="content-break">|</span>
        <div><b>Author Association: </b>{event.payload.issue.author_association}</div>
        {event.org ? <div><b>Organization: </b>{event.org && event.org.login}</div> : '' }
        <div><b>Repo Name: </b>{event.repo.name}</div>
        <div><b>Release Info: </b>{event.release.tag_name}</div>
      </span>
    </ListGroupItem>
);

export default RepoEvent;