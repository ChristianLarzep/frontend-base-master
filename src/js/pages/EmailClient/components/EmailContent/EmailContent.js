import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

function EmailContent(props) {
  const { subject, tag, from, date, body, onClick, id } = props;
  return (
    <div styleName="container">
      <div styleName="subject">
        <span>{subject}</span>
        <button styleName="actions" onClick={() => onClick(id, 1)}>
          <i className="fas fa-microchip" />
        </button>
        <button styleName="actions" onClick={() => onClick(id, 2)}>
          <i className="fas fa-trash-alt" />
        </button>
        <button styleName="actions" onClick={() => onClick(id, 3)}>
          <i className="circle fas fa-circle" />
        </button>
      </div>
      <div styleName="content">
        <div styleName="header">
          <span>{tag}</span>
          <span styleName="from">{`<${from}>`}</span>
          <span styleName="date">{date}</span>
        </div>
        <div styleName="body">{body}</div>
      </div>
    </div>
  );
}

EmailContent.propTypes = {
  body: PropTypes.string,
  date: PropTypes.string,
  from: PropTypes.string,
  subject: PropTypes.string,
  tag: PropTypes.string,
  onClick: PropTypes.func,
};

EmailContent.defaultProps = {
  subject: 'N/A',
  tag: 'N/A',
  from: 'N/A',
  date: 'No disponible',
  body: 'N/A',
};

export default EmailContent;
