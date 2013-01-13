var exec = require('child_process').exec;

module.exports = IRSend;

function IRSend () {};

IRSend.prototype.list = function(remote, code, callback) {
  var command = this._list(remote, code);
  return exec(command, callback);
};

IRSend.prototype._list = function(remote, code) {
  if (!remote) remote = "\"\"";
  if (!code) code = "\"\"";
  return "irsend " + remote + " " + code;
};
