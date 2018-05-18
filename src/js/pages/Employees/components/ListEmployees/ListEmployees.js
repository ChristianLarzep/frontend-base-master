import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Employee } from '../';

import img from './empty.png';

import './style.scss';

function ListEmployees(props) {
  const { getEmployees } = props;
  if (getEmployees && getEmployees.loading) {
    return <div>Loading</div>;
  }

  if (getEmployees && getEmployees.error) {
    return <div>Error</div>;
  }

  const { allEmployees } = getEmployees;

  return (
    <div>
      {allEmployees
        .slice(0)
        .reverse()
        .map(({ id, name, position }) => (
          <Employee
            key={id}
            id={id}
            name={name}
            position={position}
            img={img}
            className="field"
            onClick={() => props.onClick(id)}
          />
        ))}
    </div>
  );
}
ListEmployees.propTypes = {
  getEmployees: PropTypes.object,
  onClick: PropTypes.func,
};

export default ListEmployees;
