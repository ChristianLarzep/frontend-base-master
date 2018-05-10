import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Employee, EmployeeInfo } from '../../components';

import * as employeesActions from './store/actions/employees';
import img from './empty.png';

import './style.scss';

const mapStateToProps = state => {
  const { employees } = state;
  console.log('antes:', employees);
  return {
    employees,
  };
};
const actions = { ...employeesActions };

@connect(mapStateToProps, actions)
class EmployeesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employeeId: null,
    };
  }
  adding = () => {
    const added = {
      id: 10,
      name: 'Karla Martinez',
      position: 'Recepcionista',
      imagen: img,
      phone: '23456567',
      email: 'karla@hotmail.com',
    };

    console.log(added);
    this.props.addEmployee(added);
  };
  employeeSelected = id => {
    this.setState({
      employeeId: id,
    });
  };
  render() {
    let id = '';
    let details = '';
    let employeeInfo = '';
    const theEmployees = this.props.employees.employees;
    console.log('theEmployees: ', theEmployees.employees);
    if (this.state.employeeId) {
      id = this.state.employeeId;
      details = theEmployees.filter(content => content.id === id)[0];

      employeeInfo = (
        <EmployeeInfo
          key={details.id}
          name={details.name}
          position={details.position}
          img={details.img}
          phone={details.phone}
          email={details.email}
        />
      );
    }
    const employees = theEmployees.map(content => (
      <Employee
        key={content.id}
        id={content.id}
        name={content.name}
        position={content.position}
        img={content.imagen}
        className="field"
        onClick={() => this.employeeSelected(content.id)}
      />
    ));

    return (
      <div styleName="whole">
        <div styleName="container">
          <div styleName="employeeslist">
            {employees}
            <div>
              <button onClick={() => this.adding()}>Add Employee</button>
            </div>
          </div>
          <div>{employeeInfo}</div>
        </div>
      </div>
    );
  }
}

export default EmployeesList;
