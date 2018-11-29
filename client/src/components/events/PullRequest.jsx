import React from 'react';
import moment from 'moment';
import { ListGroupItem } from 'react-bootstrap';

const PullRequest = ({ pull }) => (
  <div>
    <ListGroupItem key={pull.id} className="events">
      <div className="reason"><b>{pull.pull_request ? 'Pull Request' : 'Issue Event'}</b></div>
      <img 
        src={pull.user.avatar_url} 
        alt='avatar of pull creator'
        className="feedImage"
      />
      <div><b>Updated {moment(pull.updated_at).startOf('day').fromNow()}</b></div>
      <div><b>Repo Name: </b>{pull.repository.name}</div>
      <div><b>Repo Owner: </b>{pull.user.login}</div>
      <div><b>Title: </b>pull.title}</div>
      {pull.body ? <div><b>Body: </b>{pull.body}</div> : ''}
      <div><b>Pushed At: </b>{moment(pull.pushed_at).startOf('day').fromNow()}</div>
      {pull.pull_request 
      ? 
      <div><b>Pull Request Link: </b><a href={pull.pull_request.html_url}>{pull.pull_request.html_url}</a></div>
      :
      <div><b>Issue Link: </b><a href={pull.html_url}>{pull.html_url}</a></div>
      }
    </ListGroupItem>
  </div>
);

export default PullRequest;