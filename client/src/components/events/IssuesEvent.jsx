import React from 'react';
import moment from 'moment';
import markdown from 'remove-markdown';
// import { markdown } from 'markdown';
import { ListGroupItem } from 'react-bootstrap';

const IssuesEvent = ({ event, leave }) => {
  const repoUrlSplit = event.repository_url.split('/');
  const repoName = repoUrlSplit[repoUrlSplit.length-2];
  const repoOwner = repoUrlSplit[repoUrlSplit.length-1];
  return (
    <div className="outer-event">
      <span className="content-img">
        <img src={event.user.avatar_url} alt='avatar' className="feed-img" />
      </span>
      <ListGroupItem key={event.id} className="issue-event">
      {/* {console.log('THIS IS TEsXT UNMARKED', markdown.toHTML(event.body))} */}
      {console.log()}
        <span className="content">
          <span className="content-user">@{event.user.login} created an issue.</span>{'    '}
          <i className="content-updated">{moment(event.updated_at).startOf('hour').fromNow()}.</i>
          <br /><br />
          <div className="repo-name">{repoName} / {repoOwner}</div><br />
          <div className="title">{event.title}</div><br />

          {markdown(event.body).length > 500
          ?
          <div className="event-body">{markdown(event.body).slice(0, 500) + ' ...'}</div>
          :
          <div className="event-body">{event.body}</div>
          } 
          <br />
          
          <div>
            <a onClick={leave} href={event.html_url} className="event-link">View on Github</a>
          </div>
        </span>
      </ListGroupItem>
    </div>
  );
}

export default IssuesEvent;