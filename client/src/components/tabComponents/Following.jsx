import React from 'react';
import moment from 'moment';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
const Following = ({ following }) => (
  <div>
    <h3>New repos by people you're following</h3>
    {console.log('following', following)}
    <ListGroup>
      {following.map(follow => (
        <ListGroupItem key={follow.id}>
          <img 
            src={follow.owner.avatar_url} 
            alt='avatar'
            style={{ height: 60, width: 45 }}
          />
          <div>Updated: {moment(follow.updated_at).startOf('day').fromNow()}</div>
          <div>User: {follow.owner.login}</div>
          <div>Issues: <a href={follow.html_url}>{follow.html_url}</a></div>
          <div>Events: <a href={follow.events_url}>{follow.events_url}</a></div>
        </ListGroupItem>
      ))}
    </ListGroup>
  </div>
);

export default Following;