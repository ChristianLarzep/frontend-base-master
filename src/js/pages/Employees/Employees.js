import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql, withApollo } from 'react-apollo';
import PropTypes from 'prop-types';

import { AddEmployee, ListEmployees, EmployeeInfo } from './components';
import img from './empty.png';
import * as employeesActions from './store/actions/employees';
import * as queries from './graphql';

import './style.scss';

const mapStateToProps = state => {
  const { employees } = state;

  return {
    employees,
  };
};
const actions = { ...employeesActions };

const { DELETE, GET_EMPLOYEES, SEARCH_EMPLOYEE, ADD_EMPLOYEE } = queries;

@withApollo
@graphql(SEARCH_EMPLOYEE, { name: 'searchEmployee' })
@graphql(GET_EMPLOYEES, { name: 'feedQuery' })
@graphql(DELETE, { name: 'delete' })
@graphql(ADD_EMPLOYEE, { name: 'Adding' })
@connect(mapStateToProps, actions)
class Employees extends Component {
  propTypes = {
    Adding: PropTypes.func,
    client: PropTypes.func,
    delete: PropTypes.func,
    feedQuery: PropTypes.func,
  };
  constructor(props) {
    super(props);

    this.state = {
      componentSelected: '',
      employeeData: '',
    };
  }

  deleteEmployee = async id => {
    await this.props.delete({
      variables: {
        id,
      },
      update: (store, { data: { deleteEmployee } }) => {
        const data = store.readQuery({ query: GET_EMPLOYEES });
        const index = data.allEmployees.map(content => content.id).indexOf(deleteEmployee.id);
        data.allEmployees.splice(index, 1);
        store.writeQuery({
          query: GET_EMPLOYEES,
          data,
        });
      },
    });
    this.setState({
      componentSelected: '',
    });
  };

  executeSearch = async id => {
    const result = await this.props.client.query({
      query: queries.SEARCH_EMPLOYEE,
      variables: { filter: id },
    });
    this.setState({
      componentSelected: 'EmployeeInfo',
      employeeData: result.data.allEmployees[0],
    });
  };

  addEmployee = async values => {
    const { name, position, phone, email } = values;
    await this.props.Adding({
      variables: {
        name,
        position,
        image: 'N/A',
        phone,
        email,
      },
      update: (store, { data: { createEmployee } }) => {
        const data = store.readQuery({ query: GET_EMPLOYEES });
        data.allEmployees.splice(0, 0, createEmployee);
        store.writeQuery({
          query: GET_EMPLOYEES,
          data,
        });
      },
    });
  };
  render() {
    const { employeeData, componentSelected } = this.state;
    return (
      <div styleName="whole">
        <div styleName="container">
          <div styleName="form">
            <AddEmployee onSended={values => this.addEmployee(values)} />
          </div>
          <div styleName="employeeslist">
            <ListEmployees onClick={id => this.executeSearch(id)} getEmployees={this.props.feedQuery} />
          </div>
          <div>
            {(() => {
              if (componentSelected === 'EmployeeInfo') {
                return (
                  <EmployeeInfo
                    name={employeeData.name}
                    position={employeeData.position}
                    phone={employeeData.phone}
                    email={employeeData.email}
                    id={employeeData.id}
                    img="https://i.ytimg.com/vi/AzZ4K1OzomE/maxresdefault.jpg"
                    onClick={id => this.deleteEmployee(id)}
                  />
                );
              }
              return '';
            })()}
          </div>
        </div>
      </div>
    );
  }
}

export default Employees;
