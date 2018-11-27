import React from 'react';
import moment from 'moment';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

const Starred = ({ starred }) => (
  <div>
    <h3>Repos that you have starred</h3>
    <ListGroup>
    {starred.map(star => (
      <ListGroupItem key={star.id}>
        <img 
          src={star.owner.avatar_url} 
          alt='avatar'
          style={{ height: 60, width: 45 }}
        />
        <div>Updated: {moment(star.updated_at).startOf('day').fromNow()}</div>
        <div>Repo Owner: {star.owner.login}</div>
        <div>Number of Issues Open: {star.open_issues_count}</div>
        <div>Issues: <a href={star.html_url}>{star.html_url}</a></div>
        <div>Events: <a href={star.events_url}>{star.events_url}</a></div>
      </ListGroupItem>
    ))}
    </ListGroup>
  </div>
);

export default Starred;