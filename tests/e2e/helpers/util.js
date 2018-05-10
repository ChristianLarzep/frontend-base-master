const { adminUser } = require('../fixtures/user');

const util = {
  login: function loginFn(client, data) {
    const login = client.page.login();
    const form = login.getForm();
    let email = adminUser.email;
    let password = adminUser.password;

    if (data) {
      email = data.email;
      password = data.password;
    }

    this.logout(client);
    client.pause(1000);
    login
      .navigate()
      .ready()
      .isPresent();

    form
      .setValues(email, password)
      .submit();
    client.pause(1000);
  },

  logout: function logout(client) {
    client.url(`${client.launchUrl}/logout`);
  },
};

module.exports = util;
