import React from 'react';
import moment from 'moment';
import markdown from 'remove-markdown';
import { ListGroupItem, Image } from 'react-bootstrap';

const IssuesEvent = ({ event }) => {
  const repoUrlSplit = event.repository_url.split('/');
  const repoName = repoUrlSplit[repoUrlSplit.length-2];
  const repoOwner = repoUrlSplit[repoUrlSplit.length-1];
  return (
    <ListGroupItem key={event.id} className="issue-event">
      <span className="content-img">
        <img src={event.user.avatar_url} alt='avatar' className="feed-img" />
        <b className="content-user">@{event.user.login}</b>
      </span>
      <span className="content">
        <span className="issue-event-label">Issue Event</span>
        <span className="content-break"> | </span>{'    '}
        <Image src="https://github.githubassets.com/images/icons/emoji/unicode/1f4c2.png?v8"  alt="folder image" style={{ height: 28, width: 24 }}/>{'    '}
        <span className="repo-name">{repoName}</span>
        <span className="content-break"> | </span>{'    '}
        <Image src="https://github.githubassets.com/images/icons/emoji/unicode/1f4db.png?v8" alt="user image" style={{ height: 20, width: 24 }} />{'     '}
        <span className="repo-owner">{repoOwner}</span>
        <span className="content-break"> | </span>{'    '}
        <i className="content-updated">{moment(event.updated_at).startOf('day').fromNow()}</i>
        <div><b>Issue Title:</b> {event.title}</div>
        <div><b>Author Association:</b> {event.author_association}</div>
        <div><b>Ranking:</b> {event.ranking}</div>
        {event.org ? <div><b>Organization:</b> {event.org && event.org.login}</div> : '' }
        {markdown(event.body).length > 500
        ?
        <div><b>Info: </b>{markdown(event.body).slice(0, 500) + '...'}</div>
        :
        <div><b>Info: </b>{markdown(event.body)}</div>
      }
        <div>
          <Image src="https://github.githubassets.com/images/icons/emoji/unicode/1f517.png?v8" style={{ height: 30, width: 24 }} />{'     '}
          <a href={event.html_url} className="event-link">Checkout Issue on Github</a></div>
      </span>
    </ListGroupItem>
  );
}

export default IssuesEvent;