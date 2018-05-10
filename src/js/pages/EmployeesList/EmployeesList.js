import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Employee, EmployeeInfo, Button } from '../../components';

import * as employeesActions from './store/actions/employees';
import img from './empty.png';

import './style.scss';

const mapStateToProps = state => {
  const { employees } = state;

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

    this.props.addEmployee(added);
  };

  delete = id => {
    this.props.deleteEmployee(id);
    this.setState({ employeeId: null });
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

    if (this.state.employeeId) {
      id = this.state.employeeId;
      details = theEmployees.find(content => content.id === id);

      employeeInfo = (
        <EmployeeInfo
          key={details.id}
          name={details.name}
          position={details.position}
          img={details.img}
          phone={details.phone}
          email={details.email}
          onClick={() => this.delete(details.id)}
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
            <div styleName="add-button">
              <Button disabled={false} color="primary" type="submit" onClick={() => this.adding()}>
                Add Employee
              </Button>
            </div>
          </div>
          <div>{employeeInfo}</div>
        </div>
      </div>
    );
  }
}

export default EmployeesList;
