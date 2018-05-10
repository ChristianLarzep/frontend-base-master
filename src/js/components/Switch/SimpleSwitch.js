import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './style.scss';

function SimpleSwitch({
  typeStyle,
  className,
  disabled,
  name,
  prefixText,
  suffixText,
  checked,
  onChange,
}) {
  const classes = classnames({
    [typeStyle || 'simple-switch']: true,
    active: checked,
    [className]: !!className,
    disabled,
  });

  const switchClasses = classnames({
    switch: true,
    active: checked,
  });

  return (
    <div styleName={classes} className={className}>
      {prefixText && <span styleName="prefix-text">{prefixText}</span>}

      <div styleName={switchClasses}>
        <label htmlFor={name}>
          <div styleName="switch-button" />
        </label>
        <input
          id={name}
          type="checkbox"
          checked={checked}
          onChange={onChange}
        />
      </div>

      {suffixText && <span styleName="suffix-text">{suffixText}</span>}
    </div>
  );
}

SimpleSwitch.propTypes = {
  checked: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  prefixText: PropTypes.string,
  suffixText: PropTypes.string,
  typeStyle: PropTypes.string,
  onChange: PropTypes.func,
};

export default SimpleSwitch;
