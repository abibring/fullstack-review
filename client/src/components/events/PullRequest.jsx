import React from 'react';
import moment from 'moment';
import { ListGroupItem } from 'react-bootstrap';

const PullRequest = ({ pull }) => (
  <div>
    {!pull.pull_request 
      ? 
      <ListGroupItem key={pull.id} className="events">
        <div><b>Repo Issue</b></div>
        <img 
          src={pull.user.avatar_url} 
          alt='avatar of pull creator'
          style={{ height: 85, width: 70, float: 'right' }}
        />
        <div>Updated {moment(pull.updated_at).startOf('day').fromNow()}</div>
        <div>Repo Name: {pull.repository.name}</div>
        <div>Repo Owner: {pull.user.login}</div>
        <div>Title: {pull.title}</div>
        {pull.body ? <div>Body: {pull.body}</div> : ''}
        <div>Pushed At: {moment(pull.pushed_at).startOf('day').fromNow()}</div>
        {/* <div>Pull Request: <a href={pull.pull_request.html_url}>{pull.pull_request.html_url}</a></div> */}
        <div>Issue Link: <a href={pull.html_url}>{pull.html_url}</a></div>
      </ListGroupItem>
      :
    <ListGroupItem key={pull.id} className="events">
      <div><b>Pull Request</b></div>
      <img 
        src={pull.user.avatar_url} 
        alt='avatar of pull creator'
        style={{ height: 85, width: 70, float: 'right' }}
      />
      <div>Updated {moment(pull.updated_at).startOf('day').fromNow()}</div>
      <div>Repo Name: {pull.repository.name}</div>
      <div>Repo Owner: {pull.user.login}</div>
      <div>Title: {pull.title}</div>
      {pull.body ? <div>Body: {pull.body}</div> : ''}
      <div>Pushed At: {moment(pull.pushed_at).startOf('day').fromNow()}</div>
      {/* <div>Pull Request: <a href={pull.pull_request.html_url}>{pull.pull_request.html_url}</a></div> */}
      <div>Pull Request Link: <a href={pull.html_url}>{pull.html_url}</a></div>
    </ListGroupItem>
    }
  </div>
);

export default PullRequest;