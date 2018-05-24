import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

function Email(props) {
  const { id, subject, body, tag, date, emailselected, isReaded, ...others } = props;
  return (
    <div styleName={emailselected === id ? 'open' : 'close'} {...others}>
      <div styleName="data-container">
        <span styleName="icon">
          <i className="icon far fa-user" />
        </span>
        <span styleName="tag">{tag}</span>
        <span styleName="date">{`${date.substring(5, 12)}`}</span>
        <div styleName="subject">
          <div styleName={isReaded ? '' : 'unreaded'} />
          <span>{subject}</span>
        </div>
        <div styleName="body">{body.length > 40 ? `${body.substring(0, 45)}...` : body}</div>
      </div>
    </div>
  );
}

Email.propTypes = {
  body: PropTypes.string,
  date: PropTypes.string,
  emailselected: PropTypes.string,
  isReaded: PropTypes.bool,
  subject: PropTypes.string,
  tag: PropTypes.string,
  onClick: PropTypes.func,
};

Email.defaultProps = {
  emailselected: 'close',
  isReaded: false,
  subject: 'No disponible',
  date: 'N/A',
  body: 'N/A',
  tag: 'N/A',
};

export default Email;
