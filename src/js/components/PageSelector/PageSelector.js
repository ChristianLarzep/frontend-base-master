import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './style.scss';

class PageSelector extends React.PureComponent {
  static propTypes = {
    currentPage: PropTypes.number,
    totalPages: PropTypes.number,
    onChangePage: PropTypes.func,
  };

  renderNumberButton(pageNumber) {
    const { currentPage, onChangePage } = this.props;
    const classes = classnames({
      'page-number': true,
      active: currentPage === pageNumber,
    });

    return (
      <button
        key={pageNumber}
        styleName={classes}
        onClick={() => {
          if (pageNumber !== currentPage) {
            onChangePage(pageNumber);
          }
        }}
      >
        {pageNumber}
      </button>
    );
  }

  renderShiftBackButton() {
    const { currentPage, onChangePage } = this.props;
    const nextPage = currentPage - 3 > 0 ? currentPage - 3 : 1;

    return (
      <button key="shift-back" onClick={() => onChangePage(nextPage)}>
        ...
      </button>
    );
  }

  renderShiftForwardButton() {
    const { currentPage, totalPages, onChangePage } = this.props;
    const nextPage =
      currentPage + 3 <= totalPages ? currentPage + 3 : totalPages;

    return (
      <button key="shift-forward" onClick={() => onChangePage(nextPage)}>
        ...
      </button>
    );
  }

  renderPageButtons() {
    const { currentPage, totalPages } = this.props;
    const buttons = [];
    let firstPage = currentPage - 1 > 0 ? currentPage - 1 : currentPage;

    if (currentPage === totalPages && totalPages > 2) {
      firstPage = currentPage - 2;
    }

    for (let i = firstPage; i <= totalPages; i += 1) {
      if (buttons.length < 3) {
        buttons.push(this.renderNumberButton(i));
      }
    }

    if (currentPage - 1 > 1) {
      buttons.unshift(this.renderShiftBackButton());
    }
    if (currentPage + 1 < totalPages) {
      buttons.push(this.renderShiftForwardButton());
    }

    return buttons;
  }

  render() {
    const { currentPage, totalPages, onChangePage } = this.props;

    return (
      <div styleName="page-selector">
        <button
          styleName="btn-prev"
          disabled={currentPage === 1}
          onClick={() => onChangePage(currentPage - 1)}
        >
          {'<'}
        </button>

        {this.renderPageButtons()}

        <button
          styleName="btn-next"
          disabled={currentPage === totalPages}
          onClick={() => onChangePage(currentPage + 1)}
        >
          {'>'}
        </button>
      </div>
    );
  }
}

export default PageSelector;
