import React from 'react';
import Events from '../events/Events.jsx';


const HomeFeed = ({ starred, isLoading, leave }) => (
  isLoading 
  ?
  <div className="loader"></div>
  :
  <Events starred={starred} leave={leave} />
);

export default HomeFeed;