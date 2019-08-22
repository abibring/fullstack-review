import React from 'react';
import moment from 'moment';
import markdown from 'remove-markdown';
import { ListGroupItem } from 'react-bootstrap';

const IssuesEvent = ({ event }) => {
  const repoUrlSplit = event.repository_url.split('/');
  const repoOwner = repoUrlSplit[repoUrlSplit.length - 2];
  const repoName = repoUrlSplit[repoUrlSplit.length - 1];
  return (
    <div className="outer-event">
      <span className="content-img">
        <img src={event.user.avatar_url} alt="avatar" className="feed-img" />
      </span>
      <ListGroupItem key={event.id} className="issue-event">
        <span className="content">
          <span className="content-user">
            @{event.user.login} created an issue.
          </span>
          {'    '}
          <i leav="content-updated">
            {moment(event.updated_at)
              .startOf('hour')
              .fromNow()}
            .
          </i>
          <div className="repo-name">
            {repoOwner} <span className="divider">/</span> {repoName}
          </div>
          <div className="title">{event.title}</div>
          {markdown(event.body).length > 500 ? (
            <div className="event-body">
              {markdown(event.body).slice(0, 500) + ' ...'}
            </div>
          ) : (
            <div className="event-body">{event.body}</div>
          )}
          <div>
            <a href={event.html_url} className="event-link">
              View on Github
            </a>
          </div>
        </span>
      </ListGroupItem>
    </div>
  );
};

export default IssuesEvent;
