import React from 'react';
import moment from 'moment';
import markdown from 'remove-markdown';
import { ListGroupItem, Image } from 'react-bootstrap';
import linkIcon from '../../../dist/img/link_icon.png';
import userIcon from '../../../dist/img/user_icon.png';
import folderIcon from '../../../dist/img/folder_icon.png';

const PullRequest = ({ pull }) => (
  <ListGroupItem key={pull.id} className="pull-event">
    <span className="content-img">
      <img src={pull.user.avatar_url} alt='avatar of pull creator' className="feed-img" />
    </span>
    <span className="content">
      <b className="content-user">@{pull.user.login} opened a pull request.</b>{'   '}
      <i className="content-updated">{moment(pull.updated_at).startOf('day').fromNow()}.</i><br />
      <div className="repo-name">{pull.html_url.split('/')[4]} / {pull.html_url.split('/')[3]}</div><br />
      <div>*  {pull.title}  *</div><br />
      {/* <div><b>Ranking:</b> {pull.ranking}</div> */}
      {markdown(pull.body).length > 500
      ?
      <div><b>Info: </b>{markdown(pull.body).slice(0, 500) + '...'}</div>
      :
      <div><b>Info: </b>{markdown(pull.body)}</div>
      }
      <div>
        <a href={pull.pull_request.html_url} className="event-link">View on Github</a>
      </div>
    </span>
  </ListGroupItem>
);

export default PullRequest;