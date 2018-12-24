import React from 'react';
import Events from '../events/Events.jsx';


const HomeFeed = ({ starred, isLoading }) => (
  isLoading 
  ?
  <div className="loader"></div>
  :
  <Events starred={starred} />
);

export default HomeFeed;