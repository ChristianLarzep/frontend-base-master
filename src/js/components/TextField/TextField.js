import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { autobind } from 'core-decorators';
import { Field } from 'redux-form';
import classnames from 'classnames';
import blacklist from 'blacklist';
import './style.scss';

function handleNumericKeyDown(e) {
  const { key } = e;

  if (key === 'ArrowUp' || key === 'ArrowDown') {
    e.preventDefault();
  }
}

class TextField extends Component {
  static propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    errorText: PropTypes.node,
    fileName: PropTypes.string,
    id: PropTypes.string,
    labelText: PropTypes.node,
    leftIcon: PropTypes.node,
    multiLine: PropTypes.bool,
    name: PropTypes.string,
    rightIcon: PropTypes.node,
    type: PropTypes.string,
  };

  static defaultProps = {
    multiLine: false,
    type: 'text',
  };

  buildInput(field, error) {
    const { multiLine, leftIcon, rightIcon, type, fileName } = this.props;

    const inputProps = blacklist(
      field,
      'input',
      'errorText',
      'labelText',
      'leftIcon',
      'rightIcon',
      'multiLine',
      'meta',
      'fileName',
    );

    const classes = classnames({
      input: true,
      error,
      [type]: true,
      'left-icon': leftIcon,
      'right-icon': rightIcon,
    });

    let inputElement;

    if (type === 'number') {
      inputProps.onKeyDown = inputProps.onKeyDown ? inputProps.onKeyDown : handleNumericKeyDown;
      inputProps.onWheel = e => e.preventDefault();
    }

    if (multiLine) {
      inputElement = <textarea {...field.input} styleName={classes} />;
    } else if (type === 'file') {
      inputElement = (
        <button type="button" styleName={classes} onClick={() => this.inputFile.click()}>
          <input
            {...inputProps}
            onChange={field.input.onChange}
            ref={ele => {
              this.inputFile = ele;
            }}
          />
          <span title={fileName}>{fileName}</span>
        </button>
      );
    } else {
      inputElement = <input {...field.input} {...inputProps} styleName={classes} />;
    }

    return (
      <div styleName="input-group">
        {leftIcon && <span styleName="input-addon">{leftIcon}</span>}
        {inputElement}
        {rightIcon && <span styleName="input-addon">{rightIcon}</span>}
      </div>
    );
  }

  @autobind
  renderField(field) {
    const { id, className, errorText, labelText, disabled, name } = this.props;
    const hasError = !field.meta.active && field.meta.error && field.meta.touched;

    const classes = classnames({
      'input-container': true,
      error: hasError,
      [className]: !!className,
      disabled,
    });

    const inputElement = this.buildInput(field, hasError);

    return (
      <div styleName={classes}>
        {labelText && <label htmlFor={name}>{labelText}</label>}

        {inputElement}

        {hasError && (
          <span id={`${id}-error`} styleName="input-error-text">
            {errorText}
          </span>
        )}
      </div>
    );
  }

  render() {
    return <Field {...this.props} component={this.renderField} />;
  }
}

export default TextField;
