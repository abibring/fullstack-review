import React from 'react';
import moment from 'moment';
import markdown from 'remove-markdown';
import { ListGroupItem } from 'react-bootstrap';

const PullRequest = ({ pull }) => {
  const repoUrlSplit = pull.repository_url.split('/');
  const repoOwner = repoUrlSplit[repoUrlSplit.length - 2];
  const repoName = repoUrlSplit[repoUrlSplit.length - 1];
  return (
    <div className="outer-event">
      <span className="content-img">
        <img
          src={pull.user.avatar_url}
          alt="avatar of pull creator"
          className="feed-img"
        />
      </span>
      <ListGroupItem key={pull.id} className="pull-event">
        <span className="content">
          <span className="content-user">
            @{pull.user.login} opened a pull request.
          </span>
          {'   '}
          <i className="content-updated">
            {moment(pull.updated_at)
              .startOf('hour')
              .fromNow()}
            .
          </i>
          <div className="repo-name">
            {repoOwner} <span className="divider">/</span>{' '}
            {repoName}
          </div>
          <div className="title">{pull.title}</div>
          {markdown(pull.body).length > 500 ? (
            <div className="event-body">
              {markdown(pull.body).slice(0, 500) + '...'}
            </div>
          ) : (
            <div className="event-body">{markdown(pull.body)}</div>
          )}
          <div>
            <a href={pull.pull_request.html_url} className="event-link" >
              View on Github
            </a>
          </div>
        </span>
      </ListGroupItem>
    </div>
  );
}

export default PullRequest;
