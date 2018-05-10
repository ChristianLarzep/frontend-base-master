import React from 'react';
import PropTypes from 'prop-types';

function formatMoney(value, fixed) {
  const re = new RegExp(`\\d(?=(\\d{3})+${fixed > 0 ? '\\D' : '$'})`, 'g');
  const num = value.toFixed(fixed);
  return num.replace(re, '$&,');
}

function NumberFormat({
  className,
  value,
  decimals,
  type,
  prefix,
  suffix,
  ...others
}) {
  let formatted = parseFloat(value) || 0;

  if (type === 'currency') {
    formatted = formatMoney(formatted, decimals, ',');
  } else if (type === 'percent') {
    formatted = formatted.toFixed(decimals);
  } else if (decimals) {
    formatted = formatted.toFixed(decimals);
  }

  return (
    <span className={className} {...others}>
      <span>{prefix}</span>
      <span>{formatted}</span>
      <span>{suffix}</span>
    </span>
  );
}

NumberFormat.propTypes = {
  className: PropTypes.string,
  decimals: PropTypes.number,
  prefix: PropTypes.string,
  suffix: PropTypes.string,
  type: PropTypes.oneOf(['number', 'percent', 'currency']),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

NumberFormat.defaultProps = {
  type: 'number',
};

export default NumberFormat;
