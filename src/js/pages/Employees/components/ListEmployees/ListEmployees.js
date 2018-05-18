import React from 'react';
import PropTypes from 'prop-types';

import { Employee } from '../';

import './style.scss';

function ListEmployees(props) {
  const { getEmployees, onClick } = props;
  if (getEmployees && getEmployees.loading) {
    return <div>Loading</div>;
  }

  if (getEmployees && getEmployees.error) {
    return <div>Error</div>;
  }

  const { allEmployees } = getEmployees;

  return (
    <div>
      {allEmployees.map(({ id, name, position, image }) => (
        <Employee
          key={id}
          id={id}
          name={name}
          position={position}
          img={image}
          className="field"
          onClick={() => onClick(id)}
        />
      ))}
    </div>
  );
}
ListEmployees.propTypes = {
  getEmployees: PropTypes.shape({
    allEmployees: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
    })),
  }),
  onClick: PropTypes.func,
};

export default ListEmployees;
