import React from 'react';
import { ListGroup, Col, Row, Panel, Grid } from 'react-bootstrap';
import IssueCommentEvent from './IssueCommentEvent.jsx';
import IssuesEvent from './IssuesEvent.jsx';
import PullRequestEvent from './PullRequestEvent.jsx';
import PullRequestReviewCommentEvent from './PullRequestReviewCommentEvent.jsx';
import PushEvent from './PushEvent.jsx';

const Events = ({ events }) => (
  <div>
    <h3>Events for repos you are watching or following</h3>
    {/* {console.log('events in Events', events)} */}
    <Grid>
      <Row>
        <Col xs={12} md={8} xsOffset={2}>
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
        </Col>
      </Row>
    </Grid>
   
  </div>
);

export default Events;