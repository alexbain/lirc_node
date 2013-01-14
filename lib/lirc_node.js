exports.version = '0.0.1';
exports.IRSend = require('./irsend');
exports.irsend = new exports.IRSend();

// When initiated it should call IRSend.list()
// Need to be able to parse the response
// Stub the response for IRSend.list() to match docs / raspberrypi output for testing
// Store the remotes (with all commands) on the LIRC object.
// Should have a send_once proxy to IRSend.send_once

exports.remotes = {};

exports.reload = function(callback) {
  exports.irsend.list('', '', function(error, stdout, stderr) {
    exports._populateRemotes(error, stdout, stderr);
    callback();
  });
};

// Private
exports._populateRemotes = function(error, stdout, stderr) {
  //console.log(error, stdout, stderr);
};


