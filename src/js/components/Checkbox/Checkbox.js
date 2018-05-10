import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './style.scss';

// function Checkbox(props) {
class Checkbox extends PureComponent {
  static propTypes = {
    checked: PropTypes.bool,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    labelText: PropTypes.node,
    name: PropTypes.string,
    value: PropTypes.node,
    onClick: PropTypes.func,
  };

  constructor() {
    super();

    this.checkbox = undefined;

    this.onClickCustomCheckbox = this.onClickCustomCheckbox.bind(this);
    this.setRefCheckbox = this.setRefCheckbox.bind(this);
  }

  onClickCustomCheckbox() {
    this.checkbox.click();
  }

  setRefCheckbox(element) {
    this.checkbox = element;
  }

  render() {
    const { className, checked, disabled, name, value, labelText, onClick } = this.props;

    const classes = classnames({
      checkbox: true,
      active: checked,
      disabled,
      [className]: !!className,
    });

    const checkboxClasses = classnames({
      'checkbox-button': true,
      active: checked,
    });

    const customProps = {
      onClick: this.onClickCustomCheckbox,
    };

    return (
      <div styleName={classes}>
        <label htmlFor={name}>
          <div styleName={checkboxClasses} {...customProps} />

          <span {...customProps}>{labelText}</span>

          <input
            type="checkbox"
            name={name}
            value={value}
            checked={checked}
            onClick={onClick}
            disabled={disabled}
            ref={this.setRefCheckbox}
          />
        </label>
      </div>
    );
  }
}

export default Checkbox;
