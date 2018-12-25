import React from 'react';
import { ListGroup, Col, Row, Grid } from 'react-bootstrap';
import PullRequest from './PullRequest.jsx';
import IssuesEvent from './IssuesEvent.jsx';
import ReleaseEvent from './ReleaseEvent.jsx';

const Events = ({ starred, leave }) => (
  <Grid>
    <Row>
      <Col xs={12} md={8} xsOffset={2}>
        <ListGroup>
          {starred.length > 0 && starred.map(repo =>
            repo.pull_request && !repo.published_at
            ? 
              <PullRequest pull={repo} key={repo.id} leave={leave} />
            : 
              repo.state && !repo.published_at 
            ? 
              <IssuesEvent event={repo} key={repo.id} leave={leave} />
            : 
            repo.published_at 
            ? 
              <ReleaseEvent release={repo} key={repo.id} leave={leave} />
            : 
              ''
          )}
        </ListGroup>
      </Col>
    </Row>
  </Grid>
);

export default Events;
