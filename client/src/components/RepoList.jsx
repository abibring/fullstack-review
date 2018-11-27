import React from 'react';
import moment from 'moment';

const RepoList = ({ repos }) => (
  <div>
    <h4>Recent Repo Issues</h4>
    There are {repos.length} issues:
    {repos.map(repo => (
      <ul key={repo._id}>
        <img 
          src={repo.image} 
          alt='avatar'
          style={{ height: 60, width: 45 }}
        />
        <li>Updated: {moment(repo.updated_at).startOf('day').fromNow()}</li>
        <li>User: {repo.user}</li>
        <li><a href={repo.html_url}>{repo.html_url}</a></li>
        <li>Description: {repo.description}</li>
      </ul>
    ))}
  </div>
);

export default RepoList;