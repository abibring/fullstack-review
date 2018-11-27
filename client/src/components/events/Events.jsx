import React from 'react';
import moment from 'moment';
import { ListGroup } from 'react-bootstrap';
import IssueCommentEvent from './IssueCommentEvent.jsx';
import IssuesEvent from './IssuesEvent.jsx';
import PullRequestEvent from './PullRequestEvent.jsx';
import PullRequestReviewCommentEvent from './PullRequestReviewCommentEvent.jsx';
import PushEvent from './PushEvent.jsx';

const Events = ({ events }) => (
  <div>
    <h3>Events for repos you are watching or following</h3>
    {console.log('releases', events)}
    <ListGroup>
      {events.map(event => (
        event.type === 'IssuesEvent' 
        ? 
        <IssuesEvent event={event} key={event.id} /> 
        :
        event.type === 'IssueCommentEvent'
        ?
        <IssueCommentEvent event={event} key={event.id} />
        :
        event.type === 'PullRequestEvent'
        ?
        <PullRequestEvent event={event} key={event.id} />
        :
        event.type === 'PullRequestReviewCommentEvent'
        ?
        <PullRequestReviewCommentEvent event={event} key={event.id} />
        :
        event.type === 'PushEvent'
        ?
        <PushEvent event={event} key={event.id} />
        :
        event.type === 'RepositoryEvent'
        ?
        <RepoEvent event={event} key={event.id} />
        :
        ''
        // ADD OPEN ISSUES AND CLOSED ISSUES EVENTS
      ))}
    </ListGroup>
  </div>
);

export default Events;