import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Form } from 'redux-form';

import { TextField, Button } from '../../../../components';

import './style.scss';

@reduxForm({
  form: 'form_login',
})
class AddEmployee extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    onSended: PropTypes.func,
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.props.onSended)}>
        <div styleName="left-textfiels">
          <TextField
            className="name"
            disabled={false}
            labelText="Name"
            errorText=""
            fileName=""
            id="name"
            leftIcon=""
            name="name"
            rightIcon=""
            type=""
          />
          <TextField
            className="position"
            disabled={false}
            labelText="Position"
            errorText=""
            fileName=""
            id="position"
            leftIcon=""
            name="position"
            rightIcon=""
            type=""
          />
        </div>
        <div styleName="right-textfiels">
          <TextField
            className="phone"
            disabled={false}
            labelText="Phone"
            errorText=""
            fileName=""
            id="phone"
            leftIcon=""
            name="phone"
            rightIcon=""
            type=""
          />
          <TextField
            className="email"
            disabled={false}
            labelText="Email"
            errorText=""
            fileName=""
            id="email"
            leftIcon=""
            name="email"
            rightIcon=""
            type=""
          />
        </div>
        <Button disabled={this.props.invalid} color="primary" type="submit">
          Register
        </Button>
      </Form>
    );
  }
}

export default AddEmployee;
