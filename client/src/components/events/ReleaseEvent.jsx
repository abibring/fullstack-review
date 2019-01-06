import React from 'react';
import moment from 'moment';
import markdown from 'remove-markdown';
import { ListGroupItem } from 'react-bootstrap';

const ReleaseEvent = ({ release, leave }) => {
  const repoUrlSplit = release.url.split('/');
  const repoOwner = repoUrlSplit[4];
  const repoName = repoUrlSplit[5];
  return (
    <div className="outer-event">
      <span className="content-img">
        <img
          src={release.author.avatar_url}
          alt="avatar of release author"
          className="feed-img"
        />
      </span>
      <ListGroupItem className="release-event">
        <span className="content">
          <span className="content-user">
            @{release.author.login} pushed a new release.
          </span>
          {'    '}
          <i className="content-updated">
            {moment(release.published_at)
              .startOf('hour')
              .fromNow()}
            .
          </i>
          <div className="repo-name">
            {repoOwner} <span className="divider">/</span>{' '}
            {repoName}
          </div>
          <div className="release-version">{release.tag_name}</div>
          {markdown(release.body).length > 500 ? (
            <div className="event-body">
              {markdown(release.body).slice(0, 500) + '...'}
            </div>
          ) : (
            <div className="event-body">{markdown(release.body)}</div>
          )}
          <div>
            <a onClick={leave} href={release.html_url} className="event-link">
              View on Github
            </a>
          </div>
        </span>
      </ListGroupItem>
    </div>
  );
}

export default ReleaseEvent;
