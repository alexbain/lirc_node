var exec = require('child_process').exec;

exports = module.exports = IRRecord;

function IRRecord() {};

IRRecord.prototype.startIRRecord = function(callback) {
  if(callback)//for testing
    callback();
  var command = "sudo /home/pi/lirc_web/node_modules/lirc_node/irrecord/scripts/startIRRecord";
  return exec(command);
};

IRRecord.prototype.finishIRRecord = function(callback) {
  if(callback)//for testing
    callback();
  var command = "sudo /home/pi/lirc_web/node_modules/lirc_node/irrecord/scripts/finishIRRecord";
  return exec(command);
};

// Internal methods
IRRecord.prototype._list = function(remote, code) {
  if (!remote) remote = '';
  if (!code) code = '';

  return 'irsend LIST "' + remote + '" "' + code + '"';
};

