import React, { Component } from 'react';
import axios from 'axios';
import HomeTab from './HomeTab.jsx';
import NavigationBar from '../NavigationBar.jsx';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { starred: [], watching: [], issues: [], events: [], notifications: [], isAuthenticated: false };
    this.getIssues = this.getIssues.bind(this);
    this.getWatching = this.getWatching.bind(this);
    this.getNotifications = this.getNotifications.bind(this);
    this.getStarred = this.getStarred.bind(this);
    this.getEvents = this.getEvents.bind(this);
    this.signOut = this.signOut.bind(this);
    // this.search = this.search.bind(this);
  }

  componentDidMount() {
    const { history } = this.props;
    const userToken = window.localStorage.getItem('userToken');
    if (!userToken || userToken === 'invalid') {
      history.push('/');
    } else {
      this.setState({ isAuthenticated: true });
      this.getIssues();
      this.getWatching();
      this.getStarred();
      this.getNotifications();
      this.getEvents();
    }
  }

  signOut() {
    const { history } = this.props;
    axios.get('/logout')
      .then(() => {
        window.localStorage.clear();
        this.setState({ isAuthenticated: false });
        history.push('/');
      })
      .catch(() => history.push('/'));
  }

  getEvents() {
    const userToken = window.localStorage.getItem('userToken');
    const username = window.localStorage.getItem('username');
    axios.get('/user/events', { params: { userToken, username }})
      .then(({ data }) => this.setState({ events: data }))
      .catch(err => console.error('err in get notifications', err));
  }

  getNotifications() {
    const userToken = window.localStorage.getItem('userToken');
    axios.get('/user/notifications', { params: { userToken }})
      .then(({ data }) => this.setState({ notifications: data })) 
      .catch(err => console.error('err in get notifications', err));
  }

  getWatching() {
    const userToken = window.localStorage.getItem('userToken');
    axios.get('/user/watching', { params: { userToken } })
      .then(({ data }) => this.setState({ watching: data }))
      .catch(err => console.error('err in getIssues:', err));
  }

  getIssues() {
    const userToken = window.localStorage.getItem('userToken');
    axios.get('/user/issues', { params: { userToken }})
      .then(({ data }) => this.setState({ issues: data }))
      .catch(err => console.error(`err in componentDidMount: ${err}`));
  }

  getStarred() {
    const userToken = window.localStorage.getItem('userToken');
    axios.get('/user/starred', { params: { userToken }})
      .then(({ data }) => this.setState({ starred: data }))
      .catch(err => console.error(`err in componentDidMount: ${err}`));
  }

  // search(term) {
  //   axios.post('/repos', { name: term })
  //     .then(() => this.loadData())
  //     .catch(err => console.error(`err in Homendex.jsx: search: ${err}`));
  // }

  render() {
    const { issues, watching, starred, events, notifications } = this.state;
    const { history, cookies } = this.props;
    return (
      <div>
        {/* {console.log('COOKIES', cookies.getAll())} */}
        <NavigationBar history={history} signOut={this.signOut} />
        <HomeTab issues={issues} watching={watching} starred={starred} events={events} notifications={notifications}/>
      </div>
    );
  }
}
