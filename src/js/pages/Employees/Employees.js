import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql, withApollo } from 'react-apollo';
import PropTypes from 'prop-types';
import { reduxForm, Form } from 'redux-form';

import { AddEmployee, ListEmployees, EmployeeInfo } from './components';
import * as employeesActions from './store/actions/employees';
import * as queries from './graphql';
import validator from './validator';

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
@reduxForm({ form: 'form_login', validate: validator })
class Employees extends Component {
  static propTypes = {
    Adding: PropTypes.func,
    client: PropTypes.shape({
      id: PropTypes.ID,
      name: PropTypes.string,
      position: PropTypes.String,
      image: PropTypes.String,
      phone: PropTypes.String,
      email: PropTypes.String,
    }),
    delete: PropTypes.func,
    feedQuery: PropTypes.shape({
      allEmployees: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.ID,
        name: PropTypes.string,
        position: PropTypes.String,
        image: PropTypes.String,
        phone: PropTypes.String,
        email: PropTypes.String,
      })),
    }),
    handleSubmit: PropTypes.func,
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
      query: SEARCH_EMPLOYEE,
      variables: { filter: id },
    });
    this.setState({
      componentSelected: 'EmployeeInfo',
      employeeData: result.data.allEmployees[0],
    });
  };

  addEmployee = async values => {
    const { name, position, image, phone, email } = values;
    await this.props.Adding({
      variables: {
        name,
        position,
        image,
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
    this.props.reset();
  };
  render() {
    const { handleSubmit } = this.props;
    const { employeeData, componentSelected } = this.state;
    return (
      <div styleName="whole">
        <div styleName="container">
          <div styleName="form">
            <Form name="formAdd" onSubmit={handleSubmit(this.addEmployee)}>
              <AddEmployee onSended={values => this.addEmployee(values)} invalid={this.props.invalid} />
            </Form>
          </div>
          <div styleName="employeeslist">
            <ListEmployees onClick={id => this.executeSearch(id)} getEmployees={this.props.feedQuery} />
          </div>
          <div>
            {componentSelected && (
              <EmployeeInfo
                name={employeeData.name}
                position={employeeData.position}
                phone={employeeData.phone}
                email={employeeData.email}
                id={employeeData.id}
                img={employeeData.image}
                onClick={id => this.deleteEmployee(id)}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Employees;
