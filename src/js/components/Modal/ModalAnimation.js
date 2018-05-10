import React from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-addons-css-transition-group';

function ModalAnimation({ children, timeout }) {
  return (
    <CSSTransitionGroup
      transitionName="modal"
      transitionEnterTimeout={timeout}
      transitionLeaveTimeout={timeout}
      transitionEnter
    >
      {children}
    </CSSTransitionGroup>
  );
}

ModalAnimation.propTypes = {
  children: PropTypes.node,
  timeout: PropTypes.number,
};

ModalAnimation.defaultProps = {
  timeout: 1000,
};

export default ModalAnimation;
