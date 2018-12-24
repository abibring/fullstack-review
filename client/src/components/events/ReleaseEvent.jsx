import React from 'react';
import moment from 'moment';
import markdown from 'remove-markdown';
import { ListGroupItem, Image } from 'react-bootstrap';

const ReleaseEvent = ({ release }) => (
  <ListGroupItem className="release-event">
    <span className="content-img">
      <img src={release.author.avatar_url} alt='avatar of release author' className="feed-img" />
      <b className="content-user">@{release.author.login}</b>
    </span>
    <span className="content">
      <span className="event-label">Release Notification</span>
      <span className="content-break"> | </span>{'    '}
      <Image src="https://github.githubassets.com/images/icons/emoji/unicode/1f4c2.png?v8"  alt="folder image" style={{ height: 28, width: 24 }}/>{'    '}
      <span className="repo-name">{release.html_url.split('/')[3]}</span>
      <span className="content-break"> | </span>{'   '}
      <Image src="https://github.githubassets.com/images/icons/emoji/unicode/1f4db.png?v8" style={{ height: 20, width: 24 }} />{'     '}
      <span className="repo-owner">{release.html_url.split('/')[4]}</span>
      <span className="content-break"> | </span>{'   '}
      <i className="content-updated">{moment(release.published_at).startOf('day').fromNow()}</i>
      <div><b>Release Version: </b>{release.tag_name}</div>
      <div><b>Ranking:</b> {release.ranking}</div>
      {markdown(release.body).length > 500
      ?
        <div><b>Info: </b>{markdown(release.body).slice(0, 500) + '...'}</div>
      :
        <div><b>Info: </b>{markdown(release.body)}</div>
      }
      <div>
        <Image src="https://github.githubassets.com/images/icons/emoji/unicode/1f517.png?v8" style={{ height: 30, width: 24 }} />{'     '}
        <a href={release.html_url} className="event-link">Checkout Release on Github</a>
      </div>
    </span>
  </ListGroupItem>
);

export default ReleaseEvent;