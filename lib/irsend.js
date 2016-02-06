var Promise = require('bluebird');
var exec = Promise.promisify(require('child_process').exec, { multiArgs: true });

// TODO: execOverride is used for testing. I don't like it.
function IRSend(execOverride) {
  this.command = 'irsend';
  this.exec = execOverride || exec;
}

// In some cases the default lirc socket does not work
// More info at http://wiki.openelec.tv/index.php?title=Guide_to_Lirc_IR_Blasting
IRSend.prototype.setSocket = function (socket) {
  if (socket) {
    this.command = 'irsend -d ' + socket;
  } else {
    this.command = 'irsend';
  }
};

IRSend.prototype.list = function (remote, code) {
  var command = this._list(remote, code);
  return this.exec(command);
};

IRSend.prototype.send_once = function (remote, code) {
  var command = this._send_once(remote, code);
  return this.exec(command);
};

IRSend.prototype.send_start = function (remote, code) {
  var command = this._send_start(remote, code);
  return this.exec(command);
};

IRSend.prototype.send_stop = function (remote, code) {
  var command = this._send_stop(remote, code);
  return this.exec(command);
};

IRSend.prototype.set_transmitters = function (transmitters) {
  var command = this._set_transmitters(transmitters);
  return this.exec(command);
};

IRSend.prototype.simulate = function (code) {
  var command = this._simulate(code);
  return this.exec(command);
};

// Internal methods
IRSend.prototype._list = function (remote, code) {
  if (!remote) remote = '';
  if (!code) code = '';

  return this.command + ' LIST "' + remote + '" "' + code + '"';
};

IRSend.prototype._send_once = function (remote, code) {
  var newCode = '';

  if (!remote) remote = '';
  if (!code) code = '';

  if (code instanceof Array) {
    code.forEach(function (element) {
      newCode = newCode + '"' + element + '" ';
    });

    code = newCode.trim();
    code = code.substr(1, code.length - 2);
  }

  return this.command + ' SEND_ONCE "' + remote + '" "' + code + '"';
};

IRSend.prototype._send_start = function (remote, code) {
  if (!remote) remote = '';
  if (!code) code = '';

  return this.command + ' SEND_START "' + remote + '" "' + code + '"';
};

IRSend.prototype._send_stop = function (remote, code) {
  if (!remote) remote = '';
  if (!code) code = '';

  return this.command + ' SEND_STOP "' + remote + '" "' + code + '"';
};

IRSend.prototype._set_transmitters = function (transmitters) {
  var newTransmitters = '';

  if (transmitters instanceof Array) {
    transmitters.forEach(function (element) {
      newTransmitters = newTransmitters + element + ' ';
    });

    transmitters = newTransmitters.trim();
  }

  return this.command + ' SET_TRANSMITTERS ' + transmitters;
};

IRSend.prototype._simulate = function (code) {
  return this.command + ' SIMULATE "' + code + '"';
};

exports = module.exports = IRSend;
