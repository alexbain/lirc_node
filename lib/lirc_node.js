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
  exports.irsend.list('', '', irsendCallback);

  function irsendCallback(error, stdout, stderr) {
    exports._populateRemotes(error, stdout, stderr);
    if (callback) callback();
  }
};

// Private
exports._populateRemotes = function(error, stdout, stderr) {
  var remotes = stderr.split('\n');

  exports.remotes = {};

  remotes.forEach(function(element, index, array) {
    var remoteName = element.match(/\s(.*)$/);
    if (remoteName) exports.remotes[remoteName[1]] = [];
  });
};

exports._populateCommands = function() {
  for (var remote in exports.remotes) {
    exports.irsend.list(remote, '', function(error, stdout, stderr) {
        exports._populateRemoteCommands(remote, error, stdout, stderr);
    });
  }
};

exports._populateRemoteCommands = function(remote, error, stdout, stderr) {
  var commands = stderr.split('\n');

  commands.forEach(function(element, index, array) {
    var commandName = element.match(/\s.*\s(.*)$/);
    if (commandName) exports.remotes[remote].push(commandName[1]);
  });
};
