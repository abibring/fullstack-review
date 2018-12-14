import React from 'react';
import Events from '../events/Events.jsx';
// import Watching from '../tabComponents/Watching.jsx';
// import Following from '../tabComponents/Following.jsx';
// import Starred from '../tabComponents/Starred.jsx';


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