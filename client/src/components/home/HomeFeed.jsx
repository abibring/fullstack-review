import React from 'react';
import Events from '../events/Events.jsx';


const HomeFeed = ({ repos, isLoading, leave }) => (
  isLoading 
  ?
  <div className="loader"></div>
  :
  <Events style={{ alignSelf: 'flex-start' }}repos={repos} leave={leave} />
);


export default HomeFeed;