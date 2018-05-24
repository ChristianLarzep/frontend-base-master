import React from 'react';

import { TextField, Button } from '../../../../components';

import './style.scss';

function AddEmployee(props) {
  return (
    <div styleName="formElements">
      <div styleName="left-textfiels">
        <TextField
          className="name"
          disabled={false}
          labelText="Name"
          errorText="Name Required"
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
          errorText="Position Required"
          fileName=""
          id="position"
          leftIcon=""
          name="position"
          rightIcon=""
          type=""
        />
        <TextField
          className="image"
          disabled={false}
          labelText="Image"
          errorText=""
          fileName=""
          id="image"
          leftIcon=""
          name="image"
          rightIcon=""
          type=""
        />
      </div>
      <div styleName="right-textfiels">
        <TextField
          className="phone"
          disabled={false}
          labelText="Phone"
          errorText="Phone Required"
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
          errorText="Email Required"
          fileName=""
          id="email"
          leftIcon=""
          name="email"
          rightIcon=""
          type=""
        />
        <Button disabled={props.invalid} color="primary" type="submit">
          Register
        </Button>
      </div>
    </div>
  );
}

export default AddEmployee;
