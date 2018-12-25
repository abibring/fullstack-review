import React from 'react';
import moment from 'moment';
import markdown from 'remove-markdown';
import { ListGroupItem, Image } from 'react-bootstrap';
import linkIcon from '../../../dist/img/link_icon.png';
import userIcon from '../../../dist/img/user_icon.png';
import folderIcon from '../../../dist/img/folder_icon.png';

const IssuesEvent = ({ event }) => {
  const repoUrlSplit = event.repository_url.split('/');
  const repoName = repoUrlSplit[repoUrlSplit.length-2];
  const repoOwner = repoUrlSplit[repoUrlSplit.length-1];
  return (
    <ListGroupItem key={event.id} className="issue-event">
      <span className="content-img">
        <img src={event.user.avatar_url} alt='avatar' className="feed-img" />
      </span>
      <span className="content">
        <span className="content-user">@{event.user.login} created an issue.</span>{'    '}
        <i className="content-updated">{moment(event.updated_at).startOf('hour').fromNow()}.</i><br />
        <div className="repo-name">{repoOwner} / {repoName}</div><br />
        <div>* {event.title} *</div><br />
        {/* <div><b>Author Association:</b> {event.author_association}</div> */}
        {/* <div><b>Ranking:</b> {event.ranking}</div> */}
        {/* {event.org ? <div><b>Organization:</b> {event.org && event.org.login}</div> : '' } */}
        {markdown(event.body).length > 500
        ?
        <div>{markdown(event.body).slice(0, 500) + ' ...'}</div>
        :
        <div>{markdown(event.body)}</div>
      } <br />
        <div>
          <a href={event.html_url} className="event-link">View on Github</a>
        </div>
      </span>
    </ListGroupItem>
  );
}

export default IssuesEvent;