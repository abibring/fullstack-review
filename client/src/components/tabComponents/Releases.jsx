import React from 'react';
import moment from 'moment';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

const Releases = ({ releases }) => (
  <div>
    <h3>Releases for any repos you are watching (I think releases are "tags")</h3>
    {console.log('releases', releases)}
    <ListGroup>
      {releases.map(release => (
        <ListGroupItem key={release.id}>
          <img 
            src={release.owner.avatar_url} 
            alt='avatar'
            style={{ height: 60, width: 45 }}
          />
        <div>Updated: {moment(release.updated_at).startOf('day').fromNow()}</div>
        <div>User: {release.owner.login}</div>
        <div>Issues: <a href={release.html_url}>{release.html_url}</a></div>
        <div>Events: <a href={release.events_url}>{release.events_url}</a></div>
        </ListGroupItem>
      ))}
    </ListGroup>
  </div>
);

export default Releases;