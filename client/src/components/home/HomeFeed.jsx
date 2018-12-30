import React from 'react';
import Events from '../events/Events.jsx';


const HomeFeed = ({ repos, isLoading, leave }) => {
  const repoSorted = repos.sort((a, b) => {
     return b.updated_at - a.updated_at;
  });
  return (
    isLoading 
    ?
    <div className="loader"></div>
    :
    <Events repos={repoSorted} leave={leave} />
  );
}

export default HomeFeed;