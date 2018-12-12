import React from 'react';
import { ListGroup, Col, Row, Grid } from 'react-bootstrap';
import IssueCommentEvent from './IssueCommentEvent.jsx';
import IssuesEvent from './IssuesEvent.jsx';
import PullRequestEvent from './PullRequestEvent.jsx';
import PullRequestReviewCommentEvent from './PullRequestReviewCommentEvent.jsx';
import PushEvent from './PushEvent.jsx';
import Notification from './Notification.jsx';
import PullRequest from './PullRequest.jsx';
import AssociatedEvent from './AssociatedEvent.jsx';

const Events = ({ events, notifications, pulls, associated, watching, starred }) => {
  let combined = events.concat(notifications).concat(pulls);
  combined = combined.sort(
    (a, b) =>
      new Date(b.created_at || b.updated_at) -
      new Date(a.created_at || a.updated_at)
  );
  return (
    <div>
      <h3 style={{ paddingLeft: '40%' }}>Check Out The Latest Info:</h3>
      {console.log('starred', starred)}
      <Grid>
        <Row>
          <Col xs={12} md={8} xsOffset={2}>
            <ListGroup>
              {combined.map(
                event =>
                  event.type === 'IssuesEvent' ? (
                    <IssuesEvent event={event} key={event.id} />
                  ) : event.type === 'IssueCommentEvent' ? (
                    <IssueCommentEvent event={event} key={event.id} />
                  ) : event.type === 'PullRequestEvent' ? (
                    <PullRequestEvent event={event} key={event.id} />
                  ) : event.type === 'PullRequestReviewCommentEvent' ? (
                    <PullRequestReviewCommentEvent
                      event={event}
                      key={event.id}
                    />
                  ) : event.type === 'PushEvent' ? (
                    <PushEvent event={event} key={event.id} />
                  ) : event.type === 'RepositoryEvent' ? (
                    <RepoEvent event={event} key={event.id} />
                  ) : event.subject ? (
                    <Notification notification={event} key={event.id} />
                  ) : event.author_association ? (
                    <PullRequest pull={event} key={event.id} />
                  ) : event.type === 'Issue' ? (
                    <AssociatedEvent event={associated} key={event.id} />
                  ) : (
                    ''
                  )
                // ADD OPEN ISSUES AND CLOSED ISSUES EVENTS
              )}
            </ListGroup>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default Events;
