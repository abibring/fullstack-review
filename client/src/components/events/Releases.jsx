import React from 'react';
import moment from 'moment';
import { ListGroupItem, Panel } from 'react-bootstrap';

const Releases = ({ release }) => (
  <ListGroupItem key={release.id} className="events">
    <span className="content-img">
      <img src={release.author.avatar_url} alt='avatar of release author' className="feed-img" />
    </span>
    <span className="content">
      <b className="content-user">@{release.author.login}</b>
      <span className="content-break">|</span>
      <i className="content-updated">{moment(release.created_at).startOf('day').fromNow()}</i>
      <span className="content-break">|</span>{' '}Pull Request
      <div><b>Repo Name: </b>{release.html_url.slice(19).split('/')[0]}</div>
      <div><b>Repo Owner: </b>{release.html_url.slice(19).split('/')[1]}</div>
      <div><b>Title: </b>{release.title}</div>
      <Panel eventKey="1" className="message-ext">
        <Panel.Title toggle>Info:</Panel.Title>
        <Panel.Body collapsible>
          {release.body}
        </Panel.Body>
      </Panel>
    </span>
  </ListGroupItem>
);

export default Releases;