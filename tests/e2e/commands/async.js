const util = require('util');
const events = require('events');

function Cmd() {
  events.EventEmitter.call(this);
}
util.inherits(Cmd, events.EventEmitter);

Cmd.prototype.command = function command(action) {
  action
  .then(() => this.emit('complete'))
  .catch((e) => {
    console.error('Async command error', e);
    process.exit(1);
  });
};

module.exports = Cmd;
