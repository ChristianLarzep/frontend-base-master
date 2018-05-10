import React from 'react';
import PropTypes from 'prop-types';

import Alert from '../Alert';

import errorCodes from './errorCodes';
import './style.scss';

function Span({ className, children, id }) {
  return (
    <p className={className} id={id}>
      {children}
    </p>
  );
}

Span.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

function ErrorMessage({ className, type, error, id, color }) {
  let Wrapper = Span;
  let errorMessage = '';

  if (!error) {
    return null;
  }

  if (type === 'alert') {
    Wrapper = Alert;
  }

  if (errorCodes[error.code]) {
    errorMessage = errorCodes[error.code];
  } else {
    errorMessage = error.message;
  }

  return (
    <Wrapper id={id} styleName={`error-message ${className}`} color={color}>
      {errorMessage}
    </Wrapper>
  );
}

ErrorMessage.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  error: PropTypes.shape({
    code: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    message: PropTypes.string,
  }),
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['span', 'alert']),
};

ErrorMessage.defaultProps = {
  type: 'alert',
  color: 'error',
};

export default ErrorMessage;
