import React from 'react';
import moment from 'moment';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

const ClosedIssues = ({ closedIssues }) => (
  <div>
    <h3>When an issue you are watching or commented on is closed</h3>
    {/* {console.log('closedIssues', closedIssues)} */}
    <ListGroup>
      {closedIssues.map(closedIssue => (
        <ListGroupItem key={closedIssue.id}>
          <img 
            src={closedIssue.owner.avatar_url} 
            alt='avatar'
            style={{ height: 60, width: 45 }}
          />
          <div>Updated: {moment(closedIssue.updated_at).startOf('day').fromNow()}</div>
          <div>User: {closedIssue.owner.login}</div>
          <div>Issue: <a href={closedIssue.html_url}>{closedIssue.html_url}</a></div>
          <div>Events: <a href={closedIssue.events_url}>{closedIssue.events_url}</a></div>
        </ListGroupItem>
      ))}
    </ListGroup>
  </div>
);

export default ClosedIssues;