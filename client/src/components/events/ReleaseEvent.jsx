import React from 'react';
import moment from 'moment';
import markdown from 'remove-markdown';
import { ListGroupItem, Panel } from 'react-bootstrap';

const ReleaseEvent = ({ release }) => (
  <ListGroupItem className="events">
    <span className="content-img">
      <img src={release.author.avatar_url} alt='avatar of release author' className="feed-img" />
    </span>
    <span className="content">
      <b className="content-user">@{release.author.login}</b>
      <span className="content-break">|</span>
      <i className="content-updated">{moment(release.published_at).startOf('day').fromNow()}</i>
      <span className="content-break">|</span>{' '}Release Notification
      <div><b>Repo Name: </b>{release.html_url.slice(19).split('/')[0]}</div>
      <div><b>Repo Owner: </b>{release.html_url.slice(19).split('/')[1]}</div>
      <div><b>Release Version: </b>{release.tag_name}</div>
      <Panel eventKey="1" className="message-ext">
        <Panel.Title toggle>Info:</Panel.Title>
        <Panel.Body collapsible>
          {markdown(release.body)}
        </Panel.Body>
      </Panel>
      <div><b>Release Link: </b><a href={release.html_url} style={{ color: 'white' }}>{release.html_url}</a></div>
    </span>
  </ListGroupItem>
);

export default ReleaseEvent;