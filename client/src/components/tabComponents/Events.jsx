import React from 'react';
import moment from 'moment';
import { ListGroup } from 'react-bootstrap';
import IssueCommentEvent from '../events/IssueCommentEvent.jsx';
import IssuesEvent from '../events/IssuesEvent.jsx';
import PullRequestEvent from '../events/PullRequestEvent.jsx';
import PullRequestReviewCommentEvent from '../events/PullRequestReviewCommentEvent.jsx';
import PushEvent from '../events/PushEvent.jsx';

const Events = ({ events }) => (
  <div>
    <h3>Events for repos you are watching or following</h3>
    {console.log('releases', events)}
    <ListGroup>
      {events.map(event => (
        event.type === 'IssuesEvent' 
        ? 
        <IssuesEvent event={event} /> 
        :
        event.type === 'IssueCommentEvent'
        ?
        <IssueCommentEvent event={event} />
        :
        event.type === 'PullRequestEvent'
        ?
        <PullRequestEvent event={event} />
        :
        event.type === 'PullRequestReviewCommentEvent'
        ?
        <PullRequestReviewCommentEvent event={event} />
        :
        event.type === 'PushEvent'
        ?
        <PushEvent event={event} />
        :
        event.type === 'RepositoryEvent'
        ?
        <RepoEvent event={event} />
        :
        <div>N/A</div>

        // ADD OPEN ISSUES AND CLOSED ISSUES EVENTS
      ))}
    </ListGroup>
  </div>
);

export default Events;