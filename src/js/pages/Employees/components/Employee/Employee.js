import React from 'react';
import PropTypes from 'prop-types';

import imageSrc from './empty.png';
import './style.scss';

function Employee(props) {
  const { name, position, img, ...others } = props;
  return (
    <div {...others} styleName="container">
      <div styleName="data-container">
        <div>{name}</div>
        <div styleName="position">{position}</div>
      </div>
      <span styleName="img-container">
        <img src={img} alt="" />
      </span>
    </div>
  );
}

Employee.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string,
  position: PropTypes.string,
  onClick: PropTypes.func,
};

Employee.defaultProps = {
  img: imageSrc,
  name: 'No disponible',
  position: 'N/A',
};

export default Employee;
