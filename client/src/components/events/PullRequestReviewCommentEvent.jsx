import React from 'react';
import moment from 'moment';
import { ListGroupItem } from 'react-bootstrap';

const PullRequestReviewCommentEvent = ({ event }) => (
  <ListGroupItem key={event.id} className="events">
    <span className="content-img">
      <img src={event.actor.avatar_url} alt="avatar" className="feed-img" />
    </span>
    <span className="content">
      <b className="content-user">@{event.actor.login}</b>
      <span className="content-break">|</span>
      <i className="content-updated">{moment(event.created_at).startOf('day').fromNow()}</i>
      <span className="content-break">|</span>
      <span className="pull-review-event-label">Pull Request Comment</span>
      <div><b>Author Association: </b>{event.payload.pull_request.author_association}</div>
      {event.org ? <div><b>Organization: </b>{event.org && event.org.login}</div> : '' }
      <div><b>Repo: </b>{event.repo.name}</div>
      <div><b>PR Title: </b>{event.payload.pull_request.title}</div>
      <div><b>Info: </b>{event.payload.pull_request.body}</div>
    </span>
  </ListGroupItem>
);

export default PullRequestReviewCommentEvent;