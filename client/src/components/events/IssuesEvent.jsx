import React from 'react';
import moment from 'moment';
import markdown from 'remove-markdown';
import { ListGroupItem } from 'react-bootstrap';

const IssuesEvent = ({ event }) => {
  let repoUrlSplit = event.repository_url.split('/');
  let repoName = repoUrlSplit[repoUrlSplit.length-1];
  repoName = repoName.charAt(0).toUpperCase() + repoName.slice(1);
  return (
    <ListGroupItem key={event.id} className="issue-event">
      <span className="content-img">
        <img src={event.user.avatar_url} alt='avatar' className="feed-img" />
      </span>
      <span className="content">
        <b className="content-user">@{event.user.login}</b>
        <span className="content-break"> | </span>
        <i className="content-updated">{moment(event.updated_at).startOf('day').fromNow()}</i>
        <span className="content-break"> | </span>
        <span className="issue-event-label">Issue Event</span>
        <span className="repo-name"><b>Repo:</b> {repoName}</span>
        <div><b>Author Association:</b> {event.author_association}</div>
        {event.org ? <div><b>Organization:</b> {event.org && event.org.login}</div> : '' }
        {/* {console.log('EVENT REPO', event)} */}
        <div><b>Issue Title:</b> {event.title}</div>
        <div><b>Ranking:</b> {event.ranking}</div>
        {markdown(event.body).length > 500
        ?
        <div><b>Info: </b>{markdown(event.body).slice(0, 500) + '...'}</div>
        :
        <div><b>Info: </b>{markdown(event.body)}</div>
      }
        <div><b>View Issue:</b> <a href={event.html_url} className="event-link">Visit Issue on Github</a></div>
      </span>
    </ListGroupItem>
  );
}

export default IssuesEvent;