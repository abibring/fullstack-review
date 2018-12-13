import React, { Component } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import Watching from '../tabComponents/Watching.jsx';
import Following from '../tabComponents/Following.jsx';
import Starred from '../tabComponents/Starred.jsx';
import Releases from '../tabComponents/Releases.jsx';
import Events from '../events/Events.jsx';


export default class HomeFeed extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { key: 1 };
  };

  render() {
    const { key } = this.state;
    const { issues, watching, starred, events, notifications } = this.props;
    return (
      <div>
        <Events events={events} notifications={notifications} pulls={issues} watching={watching} starred={starred}/>
        {/* <Starred starred={starred} />  
        <Releases releases={watching} />
        <Following following={watching} />
        <Watching watching={watching} /> */}
      </div>
    );
  }
}