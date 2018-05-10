import React from 'react';
import PropTypes from 'prop-types';

import imageSrc from './empty.png';

import './style.scss';

function EmployeeInfo(props) {
  const { email, name, position, img, phone } = props;
  return (
    <div styleName="container">
      <header>Employee</header>
      <div styleName="employees">
        <div styleName="first-block">
          <span styleName="img-container">
            <img src={img} alt="" />
          </span>
          <div styleName="data-container">
            <div>{name}</div>
            <div styleName="position">{position}</div>
          </div>
        </div>
        <div styleName="phone-block">
          <div>Cell Phone:</div>
          <div styleName="phone">{phone}</div>
        </div>
        <div styleName="email-block">
          <div>Email:</div>
          <div styleName="email">{email}</div>
        </div>
      </div>
    </div>
  );
}

EmployeeInfo.propTypes = {
  email: PropTypes.string,
  img: PropTypes.string,
  name: PropTypes.string,
  phone: PropTypes.string,
  position: PropTypes.string,
};

EmployeeInfo.defaultProps = {
  email: 'N/A',
  img: imageSrc,
  name: 'No disponible',
  phone: 'N/A',
  position: 'N/A',
};
export default EmployeeInfo;
