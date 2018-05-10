import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Form } from 'redux-form';

// import { graphql } from 'react-apollo';
// import { userCreate, userList } from './graphql';
import { TextField, Button, Checkbox, Select } from '../../components';

import validator from './validator';

import './style.scss';

@reduxForm({
  form: 'form_login',
  validate: validator,
})
class Login extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      checked: false,
      stylechecked: 'warning-terms-hidden',
    };
  }
  onSubmit = () => {
    if (this.state.checked === false) {
      this.setState({
        stylechecked: 'please-accept-terms',
      });
    }
  };

  onChecked() {
    this.setState({
      checked: !this.state.checked,
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <section className="login-content" styleName="login-content">
        <div className="table-bg-a" styleName="table-bg-a">
          <header>
            <div styleName="cognizant">Cognizant</div>
            <p />
            <h1 styleName="qinsight">qInisight</h1>
            <p />
            <div styleName="welcome-to-qinisight">Welcome to qInsight</div>
            <p />
            <div styleName="please-enter-you-inf">Please enter your information to login to qInsight</div>
            <p />
          </header>
          <span>Email:</span>
          <a href="#">you@cognizant.com</a>
          <div styleName="formlogin">
            <Form name="login_f" onSubmit={handleSubmit(this.onSubmit)}>
              <TextField
                className="name"
                disabled={false}
                labelText="Full Name"
                errorText="Invalid name"
                fileName=""
                id="name"
                leftIcon=""
                name="name"
                rightIcon=""
                type=""
              />
              <TextField
                className="password"
                disabled={false}
                labelText="Password"
                errorText="Invalid Password"
                fileName=""
                id="password"
                leftIcon=""
                name="password"
                rightIcon=""
                type="password"
              />
              <Select
                className="select"
                disabled={false}
                labelText="Select a Security Question"
                name="security_question"
              >
                <option>Selecciona un opcion</option>
                <option>uno</option>
                <option>dos</option>
              </Select>
              <TextField
                className="security-answer"
                disabled={false}
                labelText="Security Answer"
                errorText="Invalid Security Answer"
                fileName=""
                id="security_answer"
                leftIcon=""
                name="security_answer"
                rightIcon=""
                type=""
              />
              <footer>
                <Checkbox
                  name="terms"
                  labelText={
                    <span>
                      I accept this<a href="#"> Terms and Conditions</a>
                    </span>
                  }
                  linkText="Terms and conditions"
                  className="checkbox"
                  disabled={false}
                  onClick={() => this.onChecked()}
                  value="df"
                  checked={this.state.checked}
                />
                <div styleName="please-accept-terms">Please accept terms and conditions</div>
                <Button disabled={this.props.invalid} color="primary" styleName="submit-login" type="submit">
                  Register
                </Button>
              </footer>
            </Form>
          </div>
        </div>
      </section>
    );
  }
}

export default Login;
