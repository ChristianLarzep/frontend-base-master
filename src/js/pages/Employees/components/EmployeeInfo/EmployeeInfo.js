import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '../../../../components';

import image from './empty.png';

import './style.scss';

function EmployeeInfo(props) {
  const { img, name, position, phone, email, onClick } = props;
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
      <Button disabled={false} color="primary" type="submit" onClick={() => onClick(props.id)}>
        Delete
      </Button>
    </div>
  );
}

EmployeeInfo.propTypes = {
  email: PropTypes.string,
  img: PropTypes.string,
  name: PropTypes.string,
  phone: PropTypes.string,
  position: PropTypes.string,
  onClick: PropTypes.func,
};

EmployeeInfo.defaultProps = {
  email: 'N/A',
  img: image,
  name: 'No disponible',
  phone: 'N/A',
  position: 'N/A',
};

export default EmployeeInfo;
