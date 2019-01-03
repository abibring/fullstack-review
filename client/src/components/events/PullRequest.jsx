import React from 'react';
import moment from 'moment';
import markdown from 'remove-markdown';
import { ListGroupItem } from 'react-bootstrap';

const PullRequest = ({ pull, leave }) => (
  <div className="outer-event">
    <span className="content-img">
      <img src={pull.user.avatar_url} alt='avatar of pull creator' className="feed-img" />
    </span>
    <ListGroupItem key={pull.id} className="pull-event">
      <span className="content">
        <span className="content-user">@{pull.user.login} opened a pull request.</span>{'   '}
        <i className="content-updated">{moment(pull.updated_at).startOf('hour').fromNow()}.</i>
        <div className="repo-name">{pull.html_url.split('/')[3]} <span className="divider">/</span> {pull.html_url.split('/')[4]}</div>
        <div className="title">{pull.title}</div>
        {markdown(pull.body).length > 500
        ?
        <div className="event-body">{markdown(pull.body).slice(0, 500) + '...'}</div>
        :
        <div className="event-body">{markdown(pull.body)}</div>
        }
        <div>
          <a onClick={leave} href={pull.pull_request.html_url} className="event-link">View on Github</a>
        </div>
      </span>
    </ListGroupItem>
  </div>
);

export default PullRequest;