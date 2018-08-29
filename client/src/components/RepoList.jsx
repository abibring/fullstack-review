import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    {props.repos.map(repo => {
      return (
      <ul key={repo._id}>
        <li>{repo.url}</li>
      </ul>
      );
    })}
  </div>
)

export default RepoList;