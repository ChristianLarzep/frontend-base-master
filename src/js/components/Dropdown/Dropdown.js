/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import onClickOutside from 'react-onclickoutside';
import './style.scss';

const optionShape = {
  value: PropTypes.string,
  label: PropTypes.string,
};

@onClickOutside
class Dropdown extends Component {
  static propTypes = {
    alwaysOpen: PropTypes.bool,
    className: PropTypes.string,
    defaultOptionText: PropTypes.node,
    id: PropTypes.string,
    input: PropTypes.shape({
      // Props coming from Redux Forms' <Field /> element
      name: PropTypes.string,
      onChange: PropTypes.func,
    }),
    labelText: PropTypes.node,
    options: PropTypes.arrayOf(PropTypes.shape(optionShape)).isRequired,
    selectedOption: PropTypes.shape(optionShape),
    template: PropTypes.func,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    className: '',
    defaultOptionText: 'Opciones',
    selectedOption: {},
    template: option => option.label,
  };

  constructor(props) {
    super(props);

    this.state = {
      showOptions: props.alwaysOpen || false,
    };
  }

  handleClickOutside = () => {
    const { alwaysOpen } = this.props;

    this.setState({
      showOptions: alwaysOpen || false,
    });
  };

  toggleMenu = e => {
    const { alwaysOpen } = this.props;
    const { showOptions } = this.state;

    e.stopPropagation();

    this.setState({
      showOptions: alwaysOpen || !showOptions,
    });
  };

  renderLabel() {
    const { input, selectedOption, defaultOptionText, template } = this.props;

    if (input) {
      const { value } = input;
      if (value) return template(value);
    }

    const option = { ...selectedOption };
    return option ? template(option) : defaultOptionText;
  }

  renderOption = option => {
    const { input, onChange, selectedOption, template } = this.props;
    const { disabled } = option;
    const { value } = input || selectedOption;

    const active = value === option.value;

    const classes = classnames({ active, disabled });

    return (
      <span
        disabled={disabled}
        className={classes}
        onClick={e => {
          this.toggleMenu(e);

          if (input && input.onChange) {
            input.onChange(option);
          } else if (onChange) {
            onChange(option);
          }
        }}
      >
        {template(option, active)}
      </span>
    );
  };

  render() {
    const { id, className, labelText, options, input } = this.props;
    const { showOptions } = this.state;
    const { name } = input;

    const classes = classnames({ dropdown: true, open: showOptions });

    return (
      <div className={className} styleName="dropdown-container">
        {labelText && <label htmlFor={name}>{labelText}</label>}

        <div styleName={classes}>
          <button
            type="button"
            onClick={this.toggleMenu}
            id={`${id}-button`}
            name={name}
          >
            <span styleName="dropdown-label">{this.renderLabel()}</span>

            {!showOptions && <i className="icon-caret-down" />}
            {showOptions && <i className="icon-caret-up" />}
          </button>

          {showOptions && (
            <ul styleName="dropdown-options">
              {options &&
                options.map(option => (
                  <li key={option.value}>{this.renderOption(option)}</li>
                ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default Dropdown;
