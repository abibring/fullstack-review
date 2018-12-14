import React from 'react';
import { ListGroup, Col, Row, Grid } from 'react-bootstrap';
import PullRequest from './PullRequest.jsx';
import IssuesEvent from './IssuesEvent.jsx';
import ReleaseEvent from './ReleaseEvent.jsx';

const Events = ({ events, notifications, pulls, associated, watching, starred }) => {
  let starredSorted = starred.flat().sort((a,b) => new Date(b.updated_at || b.published_at) - new Date(a.updated_at || a.published_at));
  // console.log('SORTED', starredSorted)
  return (
    <div>
      <h3 style={{ paddingLeft: '40%' }}>Check Out The Latest Info:</h3>
      {console.log('starred', starred)}
      <Grid>
        <Row>
          <Col xs={12} md={8} xsOffset={2}>
            <ListGroup>
              {starredSorted.length > 0 && starredSorted.map(repo => (
                  repo.pull_request && !repo.published_at && !repo.state 
                  ? 
                  <PullRequest pull={repo} key={repo.id} />
                  :
                  repo.state && !repo.published_at
                  ?
                  <IssuesEvent event={repo} key={repo.id} />
                  :
                  repo.published_at
                  ?
                  <ReleaseEvent release={repo} key={repo.id} />
                  :
                  ''
                ) 
              )}
            </ListGroup>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default Events;
