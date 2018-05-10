import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './style.scss';

function ModalHeader({ className, children }) {
  const classes = classnames({
    'modal-header': true,
    [className]: !!className,
  });

  return (
    <header styleName={classes}>
      <div>{children}</div>
    </header>
  );
}

ModalHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default ModalHeader;
