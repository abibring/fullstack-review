import React from 'react';
import Events from '../events/Events.jsx';


const HomeFeed = ({ repos, isLoading, reposSearched }) => (
  isLoading
  ?
  <div className="loader"></div>
  :
  <Events repos={repos} reposSearched={reposSearched} />
);


export default HomeFeed;