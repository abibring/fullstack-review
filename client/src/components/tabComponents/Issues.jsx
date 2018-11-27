import React from 'react';
import moment from 'moment';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

const Issues = ({ issues }) => (
  <div>
    <h3>Any new issues in repos you have starred or watching</h3>
    {/* {console.log('issues', issues)} */}
    <ListGroup>
      {issues.map(issue => (
        issue.pull_request 
          ? 
          ''
          :
        <ListGroupItem key={issue.id}>
          <div>
            <img 
              src={issue.user.avatar_url} 
              alt='avatar of Issue creator'
              style={{ height: 60, width: 45 }}
            />{' '}
            Updated {moment(issue.updated_at).startOf('day').fromNow()}
          </div>
          <div>Repo Name: {issue.repository.name}</div>
          <div>Repo Owner: {issue.user.login}</div>
          <div>Title: {issue.title}</div>
          {issue.body ? <div>Body: {issue.body}</div> : ''}
          <div>Pushed At: {moment(issue.pushed_at).startOf('day').fromNow()}</div>
          {/* <div>Pull Request: <a href={issue.pull_request.html_url}>{issue.pull_request.html_url}</a></div> */}
          <div>Issues: <a href={issue.html_url}>{issue.html_url}</a></div>
          <div>Events: <a href={issue.events_url}>{issue.events_url}</a></div>
        </ListGroupItem>
      ))}
    </ListGroup>
  </div>
);

export default Issues;