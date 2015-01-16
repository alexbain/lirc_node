var exec = require('child_process').exec;

exports = module.exports = IRRecord;

function IRRecord() {};

IRRecord.prototype.startIRRecord = function(callback) {
  if(callback)//for testing
    callback();
  var command = "sudo python /home/pi/lirc_web/node_modules/lirc_node/irrecord/scripts/startIRRecord.py";
  return exec(command);
};

IRRecord.prototype.finishIRRecord = function(callback) {
  if(callback)//for testing
    callback();
  var command = "sudo python /home/pi/lirc_web/node_modules/lirc_node/irrecord/scripts/finishIRRecord.py";
  return exec(command);
};

IRRecord.prototype.learnDeviceCharacteristics = function(callback) {
  if(callback)//for testing
    callback();
  var command = "sudo python /home/pi/lirc_web/node_modules/lirc_node/irrecord/scripts/learnDevice.py";
  return exec(command);
};