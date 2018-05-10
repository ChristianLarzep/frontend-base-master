import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './style.scss';

function ModalFooter({ className, children }) {
  const classes = classnames({
    'modal-footer': true,
    [className]: !!className,
  });

  return <footer styleName={classes}>{children}</footer>;
}

ModalFooter.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default ModalFooter;
