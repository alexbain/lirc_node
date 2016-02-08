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
    .then(exports._populateCommands)
    .then(function(remotes) {
      return exports.remotes = remotes;
    });
};

// Parse the list of remotes that irsend knows about
exports._populateRemotes = function (irsendResult) {
  var remotes = {};

  irsendResult[1].split('\n').forEach(function (remote) {
    var remoteName = remote.match(/\s(.*)$/);
    if (remoteName) remotes[remoteName[1]] = [];
  });

  return remotes;
};

// Given object whose keys represent remotes, get commands for each remote
// Returns promise that will resolve when all irsend invocations complete
exports._populateCommands = function (remotesObject) {
  var commandPromises = [];
  var remoteNames = Object.keys(remotesObject);

  remoteNames.forEach(function (remote) {
    commandPromises.push(exports.irsend.list(remote, '')
      .then(function (irsendResult) {
        return { [remote]: exports._parseCommands(irsendResult) }
      })
    );
  })

  return Promise.all(commandPromises)
    .then(exports._joinRemoteCommands);
};

// Merges an array of remoteCommands into a single object
exports._joinRemoteCommands = function(remoteCommands) {
    var remotes = {};

    remoteCommands.forEach(function(remote) {
      remotes = Object.assign(remotes, remote);
    });

    return remotes;
};

// Parses the results of irsend for a specifif remote
exports._parseCommands = function (irsendResult) {
  var commands = [];

  irsendResult[1].split('\n').forEach(function (command) {
    var commandName = command.match(/\s.*\s(.*)$/);
    if (commandName && commandName[1]) commands.push(commandName[1]);
  });

  return commands;
};
