exports.version = '0.0.1';
exports.IRSend = require('./irsend');
exports.irsend = new exports.IRSend();
exports.remotes = {};

exports.init = function() {
  exports.irsend.list('', '', irsendCallback);

  function irsendCallback(error, stdout, stderr) {
    exports._populateRemotes(error, stdout, stderr);
    exports._populateCommands();
  }

  return true;
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
    (function(remote) {
      exports.irsend.list(remote, '', function(error, stdout, stderr) {
        exports._populateRemoteCommands(remote, error, stdout, stderr);
      });
    })(remote);
  }
};

exports._populateRemoteCommands = function(remote, error, stdout, stderr) {
  var commands = stderr.split('\n');

  commands.forEach(function(element, index, array) {
    var commandName = element.match(/\s.*\s(.*)$/);
    if (commandName && commandName[1]) exports.remotes[remote].push(commandName[1]);
  });
};
