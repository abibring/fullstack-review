import React from 'react';
import Events from '../events/Events.jsx';


const HomeFeed = ({ issues, watching, starred, events, notifications, isLoading }) => (
  isLoading 
    ?
    <div class="loader"></div>
    :
    <Events 
      events={events} 
      notifications={notifications} 
      pulls={issues} 
      watching={watching} 
      starred={starred} 
    />
);

export default HomeFeed;