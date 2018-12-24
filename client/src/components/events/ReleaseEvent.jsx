import React from 'react';
import moment from 'moment';
import markdown from 'remove-markdown';
import { ListGroupItem, Image } from 'react-bootstrap';
import linkIcon from '../../../dist/img/link_icon.png';
import userIcon from '../../../dist/img/user_icon.png';
import folderIcon from '../../../dist/img/folder_icon.png';

const ReleaseEvent = ({ release }) => (
  <ListGroupItem className="release-event">
    <span className="content-img">
      <img src={release.author.avatar_url} alt='avatar of release author' className="feed-img" />
      <b className="content-user">@{release.author.login}</b>
    </span>
    <span className="content">
      <span className="event-label">Release Notification</span>
      <span className="content-break"> | </span>{'    '}
      <Image src={folderIcon}  alt="folder image" style={{ height: 28, width: 24 }}/>{'    '}
      <span className="repo-name">{release.html_url.split('/')[3]}</span>
      <span className="content-break"> | </span>{'   '}
      <Image src={userIcon} alt="user icon" style={{ height: 20, width: 24 }} />{'     '}
      <span className="repo-owner">{release.html_url.split('/')[4]}</span>
      <span className="content-break"> | </span>{'   '}
      <i className="content-updated">{moment(release.published_at).startOf('day').fromNow()}</i>
      <div><b>* {release.tag_name} *</b></div>
      {/* <div><b>Ranking:</b> {release.ranking}</div> */}
      {markdown(release.body).length > 500
      ?
        <div><b>Info: </b>{markdown(release.body).slice(0, 500) + '...'}</div>
      :
        <div><b>Info: </b>{markdown(release.body)}</div>
      }
      <div>
        <Image src={linkIcon} alt="link icon" style={{ height: 30, width: 24 }} />{'     '}
        <a href={release.html_url} className="event-link">Checkout Release on Github</a>
      </div>
    </span>
  </ListGroupItem>
);

export default ReleaseEvent;