class Logger {
  showBrowserLogs(client, callback) {
    client
    .getLog('browser', (results) => {
      if (results.length > 0) {
        console.log('BROWSER LOGS', results);
      }
      callback();
    });
  }

  showState(client, callback) {
    client.execute(function() {
      return localStorage.getItem('state');
    }, [], ({ value }) => {
      console.log('LOCAL STORAGE', value);
      callback();
    });
  }
}

module.exports = new Logger();
