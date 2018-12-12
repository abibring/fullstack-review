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
        {/* <Tabs activeKey={key} onSelect={(key) => this.setState({ key })} id="controlled-tab-example" > */}
          {/* <Tab eventKey={1} title="Events/Notifications/Pull Requests">  */}
            <Events events={events} notifications={notifications} pulls={issues} watching={watching} starred={starred}/>
          {/* </Tab> */}
          {/* <Tab eventKey={2} title="Starred Repos">
            <Starred starred={starred} />
          </Tab>
          <Tab eventKey={3} title="Releases">
            <Releases releases={watching} />
          </Tab>
          <Tab eventKey={4} title="Following">
            <Following following={watching} />
          </Tab>
          <Tab eventKey={5} title="Watching">
            <Watching watching={watching} />
          </Tab> */}
        {/* </Tabs> */}
      </div>
    );
  }
}