const UserList = require('../components/ApolloUserList');

const apolloCommands = {
  ready() {
    return this.waitForElementVisible('body', 10000);
  },

  isPresent() {
    this.assert.urlEquals(this.url());
    return this.waitForElementVisible('.apollo-page', 10000);
  },

  getForm() {
    return this.section.form;
  },
};

const formCommands = {
  setValues(username, email) {
    this.setValue('@name', username);
    this.setValue('@email', email);

    return this;
  },

  submit() {
    this.click('@submit');
    this.api.pause(2000);

    return this;
  },
};

const apollo = {
  url() {
    return `${this.api.launchUrl}/apollo`;
  },
  commands: [apolloCommands],
  sections: {
    list: UserList,
    form: {
      selector: 'form',
      commands: [formCommands],
      elements: {
        name: 'input[name="name"]',
        email: 'input[name="email"]',
        submit: 'button',
      },
    },
  },
};

module.exports = apollo;
