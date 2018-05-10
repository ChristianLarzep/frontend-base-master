import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './style.scss';

class Modal extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    focusInput: PropTypes.bool,
    id: PropTypes.string,
    overModal: PropTypes.node,
    width: PropTypes.number,
  };

  static defaultProps = {
    width: 490,
    focusInput: true,
  };

  componentWillMount() {
    const html = document.querySelector('html');
    const body = document.querySelector('body');
    const htmlClasses = html.className;
    const bodyClasses = body.className;

    html.className = `${htmlClasses} no-scroll`;
    body.className = `${bodyClasses} no-scroll`;
  }

  componentDidMount() {
    const { focusInput } = this.props;

    if (focusInput) {
      const inputs =
        document.querySelectorAll('.modal-container .input-container input') ||
        [];
      if (inputs.length > 0) {
        inputs[0].focus();
      }
    }
  }

  componentWillUnmount() {
    const html = document.querySelector('html');
    const body = document.querySelector('body');
    const htmlClasses = html.className;
    const bodyClasses = body.className;
    const regex = /no-scroll/gi;

    html.className = htmlClasses.replace(regex, '');
    body.className = bodyClasses.replace(regex, '');
  }

  render() {
    const { id, className, children, overModal, width } = this.props;

    const classes = classnames({
      modal: true,
      [className]: !!className,
    });

    const style = {
      width,
    };

    return (
      <div styleName={classes} className={className} id={id}>
        <div styleName="modal-overlay" />
        <div styleName="modal-view">
          <div styleName="over-modal" style={style}>
            {overModal}
          </div>
          <div styleName="modal-container" style={style}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
