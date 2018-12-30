import React from 'react';
import Events from '../events/Events.jsx';


const HomeFeed = ({ repos, isLoading, leave }) => {
  const repoSorted = repos.sort((a, b) => {
    let aa, bb;
    if (a.updated_at === undefined) {
      aa = new Date(a.created_at);
    } else {
      aa = new Date(a.updated_at);
    }
    if (b.updated_at === undefined) {
      bb = new Date(b.created_at);
    } else {
      bb = new Date(b.updated_at);
    }
    return bb.getTime() - aa.getTime();
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