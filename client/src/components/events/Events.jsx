import React from 'react';
import { ListGroup, Col, Row, Grid } from 'react-bootstrap';
import PullRequest from './PullRequest.jsx';
import IssuesEvent from './IssuesEvent.jsx';
import Releases from './Releases.jsx';
// import IssueCommentEvent from './IssueCommentEvent.jsx';
// import PullRequestEvent from './PullRequestEvent.jsx';
// import PullRequestReviewCommentEvent from './PullRequestReviewCommentEvent.jsx';
// import PushEvent from './PushEvent.jsx';
// import Notification from './Notification.jsx';
// import AssociatedEvent from './AssociatedEvent.jsx';

const Events = ({ events, notifications, pulls, associated, watching, starred }) => (
  <div>
    <h3 style={{ paddingLeft: '40%' }}>Check Out The Latest Info:</h3>
    {console.log('starred', starred)}
    <Grid>
      <Row>
        <Col xs={12} md={8} xsOffset={2}>
          <ListGroup>
            {starred.length > 0 && starred.map(repoArr => {
              return (
                repoArr.map(repo => (
                  repo.pull_request 
                  ? 
                  <PullRequest pull={repo} key={repo.id} />
                  :
                  repo.state
                  ?
                  <IssuesEvent event={repo} key={repo.id} />
                  :
                  repo.draft 
                  ?
                  <Releases releases={repo} key={repo.id} />
                  :
                  ''
                ))
              ) 
            })}
          </ListGroup>
        </Col>
      </Row>
    </Grid>
  </div>
);

export default Events;
