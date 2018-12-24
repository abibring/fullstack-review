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
      <b className="content-user">@{pull.user.login}</b>
    </span>
    <span className="content">
      <span className="event-label">Pull Request</span>
      <span className="content-break"> | </span>{'    '}
      <Image src={folderIcon}  alt="folder image" style={{ height: 28, width: 24 }}/>{'    '}
      <span className="repo-name">{pull.html_url.split('/')[3]}</span>
      <span className="content-break"> | </span>{'    '}
      <Image src={userIcon} alt="user image" style={{ height: 20, width: 24 }} />{'     '}
      <span className="repo-owner">{pull.html_url.split('/')[4]}</span>
      <span className="content-break"> | </span>{'    '}
      <i className="content-updated">{moment(pull.updated_at).startOf('day').fromNow()}</i>
      <div><b>PR Title: </b>{pull.title}</div>
      {/* <div><b>Ranking:</b> {pull.ranking}</div> */}
      {markdown(pull.body).length > 500
      ?
      <div><b>Info: </b>{markdown(pull.body).slice(0, 500) + '...'}</div>
      :
      <div><b>Info: </b>{markdown(pull.body)}</div>
      }
      <div>
        <Image src={linkIcon} alt="link icon" style={{ height: 30, width: 24 }} />{'     '}
        <a href={pull.pull_request.html_url} className="event-link">Checkout Pull Request on Github</a>
      </div>
    </span>
  </ListGroupItem>
);

export default PullRequest;