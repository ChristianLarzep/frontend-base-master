import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './style.scss';

function Alert(props) {
  const { className, children, color, ...others } = props;

  const classes = classnames({
    'alert-message': true,
    [color]: !!color,
    [className]: !!className,
  });

  return (
    <div {...others} styleName={classes} className={className}>
      {children}
    </div>
  );
}

Alert.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.string.isRequired,
};

export default Alert;
