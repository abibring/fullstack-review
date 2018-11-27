import React from 'react';
import moment from 'moment';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

const Issues = ({ pulls }) => (
  <div>
    <h3>Any new pulls in repos you have starred or watching</h3>
    {/* {console.log('pulls', pulls)} */}
    <ListGroup>
      {pulls.map(pull => (
        !pull.pull_request 
          ? 
          ''
          :
        <ListGroupItem key={pull.id}>
          <div>
            <img 
              src={pull.user.avatar_url} 
              alt='avatar of pull creator'
              style={{ height: 60, width: 45 }}
            />{' '}
            Updated {moment(pull.updated_at).startOf('day').fromNow()}
          </div>
          <div>Repo Name: {pull.repository.name}</div>
          <div>Repo Owner: {pull.user.login}</div>
          <div>Title: {pull.title}</div>
          {pull.body ? <div>Body: {pull.body}</div> : ''}
          <div>Pushed At: {moment(pull.pushed_at).startOf('day').fromNow()}</div>
          {/* <div>Pull Request: <a href={pull.pull_request.html_url}>{pull.pull_request.html_url}</a></div> */}
          <div>Pull Request: <a href={pull.html_url}>{pull.html_url}</a></div>
          <div>Events: <a href={pull.events_url}>{pull.events_url}</a></div>
        </ListGroupItem>
      ))}
    </ListGroup>
  </div>
);

export default Issues;