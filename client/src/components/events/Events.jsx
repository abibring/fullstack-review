import React from 'react';
import { ListGroup, Col, Row, Grid } from 'react-bootstrap';
import PullRequest from './PullRequest.jsx';
import IssuesEvent from './IssuesEvent.jsx';
import ReleaseEvent from './ReleaseEvent.jsx';

const Events = ({ starred }) => {
  return (
    <div>
      <h3 style={{ paddingLeft: '40%' }}>Your Github Updates</h3>
      <Grid>
        <Row>
          <Col xs={12} md={8} xsOffset={2}>
            <ListGroup>
              {starred.length > 0 && starred.map(repo =>
                repo.pull_request && !repo.published_at
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
              )}
            </ListGroup>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default Events;
