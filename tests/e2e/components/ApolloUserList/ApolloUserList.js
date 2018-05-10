const commands = {
  isPresent() {
    return this.waitForElementVisible(this.selector, 10000);
  },

  getRowsCount() {
    return new Promise((resolve, reject) => {
      try {
        this.api.elements('css selector', 'table tbody tr', (result) => {
          resolve(result.value.length);
        });
      } catch (e) {
        reject(e);
      }
    });
  },

  textShouldEqual(element, value) {
    this.api.pause(3000);
    this.assert.containsText(element, value);
    return this;
  },
};

module.exports = {
  selector: '.post-list',
  commands: [commands],
  elements: {
    lastElementName: 'tr:last-child td:nth-child(2)',
  },
};
