import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { reduxForm, Form } from 'redux-form';

import { TextField, Button, ErrorMessage } from '../../components';

import { userCreate, userList } from './graphql';

import './style.scss';

const erroFn = (errors, self) => {
  // TODO: Handle Error Message
  // console.error('there was an error sending the query', errors);
  self.setState({ errors });
};

@graphql(userList, {})
@graphql(userCreate, {
  name: 'newUserMutation',
  options: {
    update: (state, { data: { createUser } }) => {
      const data = state.readQuery({ query: userList });
      data.users.nodes.push(createUser);
      state.writeQuery({ query: userList, data });
    },
  },
})
@reduxForm({ form: 'formApollo' })
class Apollo extends Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool,
    }),
    handleSubmit: PropTypes.func,
    newUserMutation: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      errors: [],
    };
  }

  onSubmit = values => {
    const { newUserMutation } = this.props;
    newUserMutation({
      variables: {
        input: {
          name: values.name,
          email: values.email,
        },
      },
    })
      .then(this.setState({ errors: [] }))
      .catch(errors => erroFn(errors, this));
  };

  render() {
    const { data, handleSubmit } = this.props;
    const { errors } = this.state;

    return (
      <div className="container" styleName="apollo-page">
        <h1>Apollo Page</h1>

        <div className="row">
          {!data.loading && (
            <table styleName="post-list">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {data.users.nodes.map(({ id, name, email }) => (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="row">
          <div className="col-4" />
          <div className="col-4">
            <h3>Form</h3>

            {errors.message && (
              <ErrorMessage
                type="alert"
                error={{ code: 101, message: errors.message }}
              />
            )}

            <Form onSubmit={handleSubmit(this.onSubmit)}>
              <TextField name="name" labelText="name" />
              <TextField name="email" type="email" labelText="email" />
              <Button type="submit">Send</Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default Apollo;
