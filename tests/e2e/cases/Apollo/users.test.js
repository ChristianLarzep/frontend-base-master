const Logger = require('../../helpers/logger');
// const Utils = require('../../helpers/util');

describe('Apollo', () => {
  it('setup', (client) => {
    client
      .setWindowPosition(0, 0)
      .resizeWindow(1280, 800);
    // Utils.login(client);
  });

  it('should create a new user', (client) => {
    const apollo = client.page.apollo();
    const { list, form } = apollo.section;
    const id = Math.random();
    const username = `user-${id}`;
    const email = `${username}@agavelab.com`;
    let userCount;

    apollo.navigate().ready().isPresent();

    const validations = Promise.resolve()
      .then(() => list.isPresent())
      .then(() => list.getRowsCount())
      .then((count) => {
        userCount = count;
      })
      .then(() => form.setValues(username, email))
      .then(() => form.submit())
      .then(() => list.getRowsCount())
      .then(count => client.assert.equal(userCount + 1, count))
      .then(() => list.textShouldEqual('@lastElementName', username));

    client.async(validations);
  });

  afterEach((client, done) => Logger.showBrowserLogs(client, done));

  after((client, done) => {
    // Utils.logout(client);
    client.end(() => {
      done();
    });
  });
});
