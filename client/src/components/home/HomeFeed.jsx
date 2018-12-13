import React, { Component } from 'react';
import Events from '../events/Events.jsx';
// import Watching from '../tabComponents/Watching.jsx';
// import Following from '../tabComponents/Following.jsx';
// import Starred from '../tabComponents/Starred.jsx';


export default class HomeFeed extends Component {
  constructor(props, context) {
    super(props, context);
  };

  render() {
    const { issues, watching, starred, events, notifications } = this.props;
    return (
      <div>
        <Events 
          events={events} 
          notifications={notifications} 
          pulls={issues} 
          watching={watching} 
          starred={starred} 
        />
        {/* <Starred starred={starred} />  
        <Releases releases={watching} />
        <Following following={watching} />
        <Watching watching={watching} /> */}
      </div>
    );
  }
}