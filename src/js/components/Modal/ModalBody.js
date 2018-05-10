import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './style.scss';

function ModalBody({ children, className }) {
  const classes = classnames({
    'modal-body': true,
    [className]: !!className,
  });

  return <div styleName={classes}>{children}</div>;
}

ModalBody.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default ModalBody;
