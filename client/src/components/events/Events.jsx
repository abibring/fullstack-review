import React from 'react';
import { ListGroup, Col, Row, Grid } from 'react-bootstrap';
import PullRequest from './PullRequest.jsx';
import IssuesEvent from './IssuesEvent.jsx';
import ReleaseEvent from './ReleaseEvent.jsx';
import ScrollUpButton from "react-scroll-up-button"; 

const Events = ({ repos, leave, reposSearched }) => (
  <Grid>
    <Row>
      <Col xs={12} md={8} xsOffset={2}>
        <ListGroup>
          {repos.length > 0 && repos.map(repo =>
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
          <ScrollUpButton />
        </ListGroup>
      </Col>
    </Row>
  </Grid>
);

export default Events;
