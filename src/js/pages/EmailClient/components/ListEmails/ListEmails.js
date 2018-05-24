import React from 'react';
import PropTypes from 'prop-types';

import { Email } from '../';

import './style.scss';

function ListEmails(props) {
  const { getRequest, emailSelected, onClick, allData } = props;
  if (getRequest && getRequest.loading) {
    return <div>Loading</div>;
  }

  if (getRequest && getRequest.error) {
    return <div>Error</div>;
  }
  return (
    <div styleName="list">
      {allData.map(({ id, subject, body, tag, date, isReaded }) => (
        <Email
          key={id}
          id={id}
          subject={subject}
          body={body}
          tag={tag}
          date={date}
          isReaded={isReaded}
          emailselected={emailSelected}
          onClick={() => onClick(id)}
        />
      ))}
    </div>
  );
}
ListEmails.propTypes = {
  allData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.ID,
    from: PropTypes.string,
    subject: PropTypes.String,
    tag: PropTypes.String,
    isReaded: PropTypes.Boolean,
    deleted: PropTypes.Boolen,
    date: PropTypes.String,
  })),
  emailSelected: PropTypes.string,
  getRequest: PropTypes.shape({
    allInboxes: PropTypes.arrayOf(PropTypes.shape({
      from: PropTypes.string,
    })),
  }),
  onClick: PropTypes.func,
};

export default ListEmails;
