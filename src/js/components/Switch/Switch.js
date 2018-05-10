import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { autobind } from 'core-decorators';
import { Field } from 'redux-form';
import classnames from 'classnames';
import './style.scss';

class Switch extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    name: PropTypes.string,
  }

  @autobind renderField(field) {
    const { input } = field;
    const { checked } = input;
    const {
      className,
      disabled,
      name,
    } = this.props;

    const classes = classnames({
      switch: true,
      active: checked,
      disabled,
      [className]: !!className,
    });

    const checkboxClasses = classnames({
      'switch-button': true,
      active: checked,
    });

    return (
      <div styleName={classes}>
        <label htmlFor={name}>
          <div styleName={checkboxClasses} />
        </label>

        <input {...field.input} id={name} type="checkbox" />
      </div>
    );
  }

  render() {
    return <Field {...this.props} component={this.renderField} type="checkbox" />;
  }
}

export default Switch;
