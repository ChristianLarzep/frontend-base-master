import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Query, ApolloProvider, graphql } from 'react-apollo';
import gql from 'graphql-tag';

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
const GET_EMPLOYEES = gql`
  {
    allEmployees {
      id
      name
      position
      image
      phone
      email
    }
  }
`;

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
    // this.setState({
    //  employeeId: id,
    // });
  };

  render() {
    const employeeInfo = '';
    const theEmployees = this.props.employees.employees;

    if (this.state.employeeId) {
      let details = '';
      details = theEmployees.find(content => content.id === this.state.employeeId);
    }

    if (this.props.feedQuery && this.props.feedQuery.loading) {
      return <div>Loading</div>;
    }

    // 2
    if (this.props.feedQuery && this.props.feedQuery.error) {
      return <div>Error</div>;
    }

    // 3
    const linksToRender = this.props.feedQuery.allEmployees;

    return (
      <div styleName="whole">
        <div styleName="container">
          <div styleName="employeeslist">
            <div>
              {linksToRender.map(({ id, name, position, image, phone, email }) => (
                <Employee
                  key={id}
                  id={id}
                  name={name}
                  position={position}
                  img={img}
                  className="field"
                  onClick={() => this.employeeSelected(id)}
                />
              ))}
            </div>

            <div styleName="add-button">
              <Button disabled={false} spinner={false} color="primary" type="submit" onClick={() => this.adding()}>
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
export default graphql(GET_EMPLOYEES, { name: 'feedQuery' })(EmployeesList);

// la url del servidor graphql se añade en src/js/config.js     graphql: 'https://api.graph.cool/simple/v1/cjh2lhpn34irb0106mrjkgsbg',
