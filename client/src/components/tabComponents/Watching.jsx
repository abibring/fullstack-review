import React from 'react';
import moment from 'moment';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

const Watching = ({ watching }) => (
  <div>
    <h3>Comments on issues you have commented on or are watching</h3>
    <ListGroup>
    {watching.map(watch => (
      <ListGroupItem key={watch.id}>
        <img 
          src={watch.owner.avatar_url} 
          alt='avatar'
          style={{ height: 60, width: 45 }}
        />
        <div>Updated: {moment(watch.updated_at).startOf('day').fromNow()}</div>
        <div>User: {watch.owner.login}</div>
        <div>Issues: <a href={watch.html_url}>{watch.html_url}</a></div>
        <div>Events: <a href={watch.events_url}>{watch.events_url}</a></div>
      </ListGroupItem>
    ))}
    </ListGroup>
  </div>
);

export default Watching;