import React, { Component } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import Issues from '../tabComponents/Issues.jsx';
import Watching from '../tabComponents/Watching.jsx';
import Notifications from '../tabComponents/Notifications.jsx';
import Following from '../tabComponents/Following.jsx';
import Starred from '../tabComponents/Starred.jsx';
import Releases from '../tabComponents/Releases.jsx';
import PullRequests from '../tabComponents/PullRequests.jsx';
import Events from '../events/Events.jsx';


export default class HomeTab extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { key: 1 };
  };

  render() {
    const { key } = this.state;
    const { issues, watching, starred, events, notifications } = this.props;
    return (
      <div>
        {console.log('ISSUES', issues)}
        <Tabs activeKey={key} onSelect={(key) => this.setState({ key })} id="controlled-tab-example">
          <Tab eventKey={1} title="Repo Events"> 
            <Events events={events} />
          </Tab>
          <Tab eventKey={2} title="Notifications">
            <Notifications notifications={notifications} />
          </Tab>
          <Tab eventKey={3} title="Pull Requests">
            <PullRequests pulls={issues} />
          </Tab>
          <Tab eventKey={4} title="Starred Repos">
            <Starred starred={starred} />
          </Tab>
          <Tab eventKey={5} title="Releases">
            <Releases releases={watching} />
          </Tab>
          <Tab eventKey={6} title="Following">
            <Following following={watching} />
          </Tab>
          <Tab eventKey={7} title="Watching">
            <Watching watching={watching} />
          </Tab>
          <Tab eventKey={8} title="Issues">
            <Issues issues={issues} />
          </Tab>
        </Tabs>
      </div>
    );
  }
}