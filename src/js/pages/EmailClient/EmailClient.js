import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql, withApollo } from 'react-apollo';
import PropTypes from 'prop-types';

import { ListEmails, EmailContent } from './components';
import * as queries from './graphql';

import './style.scss';

const {
  DELETE_INBOX,
  GET_INBOX,
  GET_TRASHES,
  GET_SPAMS,
  SEARCH_EMAIL,
  SEARCH_TRASH,
  SEARCH_SPAM,
  UPDATE_STATE_TRUE,
  UPDATE_STATE_FALSE,
  UPDATE_TRASH_TRUE,
  UPDATE_TRASH_FALSE,
  UPDATE_SPAM_TRUE,
  UPDATE_SPAM_FALSE,
  MOVE_TO_TRASH,
} = queries;

@withApollo
@graphql(queries.SEARCH_EMAIL, { name: 'searchEmail' })
@graphql(SEARCH_TRASH, { name: 'searchTrash' })
@graphql(SEARCH_SPAM, { name: 'searchSpam' })
@graphql(GET_INBOX, { name: 'getInbox' })
@graphql(GET_TRASHES, { name: 'getTrash' })
@graphql(GET_SPAMS, { name: 'getSpam' })
@graphql(DELETE_INBOX, { name: 'deleteInbox' })
@graphql(UPDATE_STATE_TRUE, { name: 'updateStateTrue' })
@graphql(UPDATE_STATE_FALSE, { name: 'updateStateFalse' })
@graphql(UPDATE_TRASH_TRUE, { name: 'updateTrashTrue' })
@graphql(UPDATE_TRASH_FALSE, { name: 'updateTrashFalse' })
@graphql(UPDATE_SPAM_TRUE, { name: 'updateSpamTrue' })
@graphql(UPDATE_SPAM_FALSE, { name: 'updateSpamFalse' })
@graphql(MOVE_TO_TRASH, { name: 'moveToTrash' })
class Employees extends Component {
  static propTypes = {
    client: PropTypes.shape({}),
    deleteInbox: PropTypes.func,
    getInbox: PropTypes.shape({
      allInboxes: PropTypes.arrayOf(PropTypes.shape({})),
    }),
    getSpam: PropTypes.shape({
      allSpams: PropTypes.arrayOf(PropTypes.shape({})),
    }),
    getTrash: PropTypes.shape({
      allTrashes: PropTypes.arrayOf(PropTypes.shape({})),
    }),
    moveToTrash: PropTypes.func,
    updateStateFalse: PropTypes.func,
    updateStateTrue: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      componentSelected: '',
      emailData: '',
      emailSelected: '',
      request: '',
      optionSelected: 3,
      allData: '',
    };
  }

  executeSearch = async (id, option) => {
    const search = [SEARCH_SPAM, SEARCH_TRASH, SEARCH_EMAIL];
    const get = [GET_SPAMS, GET_TRASHES, GET_INBOX];
    const { updateSpamTrue, updateStateTrue, updateTrashTrue } = this.props;
    const updating = [updateSpamTrue, updateTrashTrue, updateStateTrue];
    await updating[option - 1]({
      variables: { id },
      update: store => {
        const data = store.readQuery({ query: get[option - 1] });
        store.writeQuery({
          query: get[option - 1],
          data,
        });
      },
    });
    const result = await this.props.client.query({
      query: search[option - 1],
      variables: { filter: id },
    });

    if (option === 3) {
      this.setState({
        componentSelected: 'EmailContent',
        emailData: result.data.allInboxes[0],
        emailSelected: result.data.allInboxes[0].id,
        request: this.props.getInbox,
        allData: this.props.getInbox.allInboxes,
      });
    } else if (option === 2) {
      this.setState({
        componentSelected: 'EmailContent',
        emailData: result.data.allTrashes[0],
        emailSelected: result.data.allTrashes[0].id,
        request: this.props.getTrash,
        allData: this.props.getTrash.allTrashes,
      });
    } else if (option === 1) {
      this.setState({
        componentSelected: 'EmailContent',
        emailData: result.data.allSpams[0],
        emailSelected: result.data.allSpams[0].id,
        request: this.props.getSpam,
        allData: this.props.getSpam.allSpams,
      });
    }
  };

  actions = async (id, action, option) => {
    const { updateSpamFalse, updateTrashFalse, updateStateFalse } = this.props;
    const get = [GET_SPAMS, GET_TRASHES, GET_INBOX];
    const update = [updateSpamFalse, updateTrashFalse, updateStateFalse];
    if (action === 3) {
      await update[option - 1]({
        variables: { id },
        update: store => {
          const data = store.readQuery({ query: get[option - 1] });
          store.writeQuery({
            query: get[option - 1],
            data,
          });
        },
      });

      const requests = [this.props.getSpam, this.props.getTrash, this.props.getInbox];
      const allData = [this.props.getSpam.allSpams, this.props.getTrash.allTrashes, this.props.getInbox.allInboxes];
      this.setState({
        request: requests[option - 1],
        allData: allData[option - 1],
      });
    } else if (action === 2) {
      const content = await this.props.client.query({
        query: SEARCH_EMAIL,
        variables: { filter: id },
      });

      const { from, subject, body, tag, isReaded, deleted, date } = content.data.allInboxes[0];
      await this.props.moveToTrash({
        variables: { from, subject, body, tag, isReaded, deleted, date },
      });
      await this.props.deleteInbox({
        variables: { id },
        update: store => {
          const data = store.readQuery({ query: GET_INBOX });
          store.writeQuery({
            query: GET_INBOX,
            data,
          });
        },
      });
    }
    this.setState({
      emailSelected: '',
      componentSelected: '',
    });
  };

  options = option => {
    if (option === 1) {
      this.setState({ request: this.props.getSpam, allData: this.props.getSpam.allSpams, optionSelected: 1 });
    } else if (option === 2) {
      this.setState({ request: this.props.getTrash, allData: this.props.getTrash.allTrashes, optionSelected: 2 });
    } else if (option === 3) {
      this.setState({ request: this.props.getInbox, allData: this.props.getTrash.allInboxes, optionSelected: 3 });
    }
  };

  render() {
    const { emailData, componentSelected } = this.state;
    return (
      <div styleName="container">
        <aside styleName="employeeslist">
          <ul>
            <button styleName="options" onClick={() => this.options(1)}>
              <i className="fas fa-microchip" />Spam
            </button>
            <button styleName="options" onClick={() => this.options(2)}>
              <i className="fas fa-trash-alt" />Trash
            </button>
            <button styleName="options" onClick={() => this.options(3)}>
              <i className="fas fa-inbox" />Inbox
            </button>
          </ul>
          <ListEmails
            onClick={id => this.executeSearch(id, this.state.optionSelected)}
            getRequest={this.state.request ? this.state.request : this.props.getInbox}
            emailSelected={this.state.emailSelected}
            allData={this.state.allData ? this.state.allData : this.props.getInbox.allInboxes}
          />
        </aside>
        <div styleName="email">
          {componentSelected && (
            <EmailContent
              subject={emailData.subject}
              tag={emailData.tag}
              from={emailData.from}
              date={emailData.date}
              body={emailData.body}
              id={emailData.id}
              onClick={(id, action) => this.actions(id, action, this.state.optionSelected)}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Employees;
