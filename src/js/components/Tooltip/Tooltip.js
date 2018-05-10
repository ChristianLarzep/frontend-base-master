import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { autobind } from 'core-decorators';
import classnames from 'classnames';
import './style.scss';

const placements = ['top', 'top-right', 'bottom', 'left', 'right'];

class Tooltip extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    placement: PropTypes.oneOf(placements),
    target: PropTypes.string.isRequired,
    toggle: PropTypes.func,
  };

  static defaultProps = {
    placement: 'right',
  };

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  componentDidMount() {
    this.target = this.getTarget();
    this.addTargetEvents();
  }

  componentWillUnmount() {
    this.removeTargetEvents();
  }

  @autobind
  onMouseOverTooltip() {
    this.setState({
      isOpen: true,
    });
    this.toggle();
  }

  @autobind
  onMouseLeaveTooltip() {
    this.setState({
      isOpen: false,
    });
    this.toggle();
  }

  getTarget() {
    const { target } = this.props;
    return document.getElementById(target);
  }

  addTargetEvents() {
    this.target.addEventListener('mouseover', this.onMouseOverTooltip, true);
    this.target.addEventListener('mouseout', this.onMouseLeaveTooltip, true);
  }

  removeTargetEvents() {
    this.target.removeEventListener('mouseover', this.onMouseOverTooltip, true);
    this.target.removeEventListener('mouseout', this.onMouseLeaveTooltip, true);
  }

  @autobind
  toggle() {
    const { toggle } = this.props;
    const { isOpen } = this.state;

    if (toggle) {
      toggle(isOpen);
    }
  }

  render() {
    const { placement, className, children, ...others } = this.props;

    const { isOpen } = this.state;

    const classes = classnames({
      tooltip: true,
      [placement]: !!placement,
      [className]: !!className,
    });

    if (!isOpen) {
      return null;
    }

    return (
      <div {...others} styleName={classes}>
        <div styleName="tooltip-inner">{children}</div>
      </div>
    );
  }
}

export default Tooltip;
