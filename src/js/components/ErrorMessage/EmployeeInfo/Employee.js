import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

function Employee(props) {
  return (
    <div styleName="container" onClick={props.onClick}>
      <div styleName="data-container">
        <div>{props.name}</div>
        <div styleName="position">{props.position}</div>
      </div>
      <span styleName="img-container">
        <img src={props.img} alt="" />
      </span>
    </div>
  );
}
Employee.propTypes = {
  className: React.PropTypes.string.isRequired,
  img: React.PropTypes.string.isRequired,
  id: React.PropTypes.number.isRequired,
  name: React.PropTypes.string.isRequired,
  position: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func,
};
export default Employee;
