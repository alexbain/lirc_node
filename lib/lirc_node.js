var Promise = require('bluebird');

// Setup irsend
exports.IRSend = require('./irsend');
exports.irsend = new exports.IRSend();
exports.remotes = {};

// Setup irreceive
exports.IRReceive = require('./irreceive');
var irreceive = new exports.IRReceive();

// Setup event listeners for irreceive
exports.addListener = irreceive.addListener.bind(irreceive);
exports.on = exports.addListener;
exports.removeListener = irreceive.removeListener.bind(irreceive);

// In some cases the default lirc socket does not work
// More info at http://wiki.openelec.tv/index.php?title=Guide_to_Lirc_IR_Blasting
exports.setSocket = function(socket) {
  exports.irsend.setSocket(socket);
}

exports.init = function() {
  return exports.irsend.list('', '')
    .then(exports._populateRemotes)
    .then(exports._populateCommands);
};

// Private
exports._populateRemotes = function(result) {
  var remotes = result[1].split('\n');

  exports.remotes = {};

  remotes.forEach(function(element, index, array) {
    var remoteName = element.match(/\s(.*)$/);
    if (remoteName) exports.remotes[remoteName[1]] = [];
  });

  return remotes;
};

exports._populateCommands = function() {
  var promises = [];
  var remotes = Object.keys(exports.remotes);

  remotes.forEach(function(remote) {
    promises.push(exports.irsend.list(remote, '')
      .then(function(result) {
        exports._populateRemoteCommands(remote, result);
      })
    );
  })

  return Promise.all(promises);
};

exports._populateRemoteCommands = function(remote, result) {
  var commands = result[1].split('\n');

  commands.forEach(function(element, index, array) {
    var commandName = element.match(/\s.*\s(.*)$/);
    if (commandName && commandName[1]) exports.remotes[remote].push(commandName[1]);
  });
};
