import React from 'react';
import moment from 'moment';
import markdown from 'remove-markdown';
import { ListGroupItem, Panel } from 'react-bootstrap';

const ReleaseEvent = ({ release }) => (
  <ListGroupItem className="release-event">
    <span className="content-img">
      <img src={release.author.avatar_url} alt='avatar of release author' className="feed-img" />
    </span>
    <span className="content">
      <b className="content-user">@{release.author.login}</b>
      <span className="content-break">|</span>
      <i className="content-updated">{moment(release.published_at).startOf('day').fromNow()}</i>
      <span className="content-break">|</span><span className="release-event-label">Release Notification</span>
      <div><b>Repo Name: </b>{release.html_url.slice(19).split('/')[0]}</div>
      <div><b>Repo Owner: </b>{release.html_url.slice(19).split('/')[1]}</div>
      <div><b>Release Version: </b>{release.tag_name}</div>
      <div><b>RANKING:</b> {release.ranking}</div>
      <div><b>Release Link: </b><a href={release.html_url} style={{ color: 'white' }}>{release.html_url}</a></div>
      <Panel eventKey="1" className="message-ext">
        <Panel.Title toggle><b>Click For Release Info</b></Panel.Title>
        <Panel.Body collapsible>
          {markdown(release.body)}
        </Panel.Body>
      </Panel>
    </span>
  </ListGroupItem>
);

export default ReleaseEvent;