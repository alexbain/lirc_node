var lirc_node = require('../'),
    assert = require('assert'),
    sinon = require('sinon'),
    q = require('q');

describe('lirc_node', function() {
  describe('init', function() {
    it('should exist', function() {
      assert(lirc_node.init instanceof Function);
    });
  });

  describe("Setting an internal list of Remotes", function() {
    describe('#_populateRemotes', function() {
      beforeEach(function() {
        lirc_node.remotes = {};
      });

      it('should exist', function() {
        assert(lirc_node._populateRemotes instanceof Function);
      });

      it('should set exports.remotes as an object', function() {
        lirc_node._populateRemotes('', '', '');
        assert(lirc_node.remotes instanceof Object);
      });

      it('should set exports.remotes to have keys for a single remote name', function() {
        var stderr = "irsend: SonyTV";

        lirc_node._populateRemotes('', '', stderr);

        assert(Object.keys(lirc_node.remotes).length === 1);
        assert(lirc_node.remotes["SonyTV"] instanceof Array);
      });

      it('should set exports.remotes to have keys for all remote names', function() {
          var stderr = "irsend: Yamaha\nirsend: Arizer\nirsend: Microsoft_Xbox360";

          lirc_node._populateRemotes('', '', stderr);

          assert(Object.keys(lirc_node.remotes).length === 3);
          assert(lirc_node.remotes["Yamaha"] instanceof Array);
          assert(lirc_node.remotes["Arizer"] instanceof Array);
          assert(lirc_node.remotes["Microsoft_Xbox360"] instanceof Array);
      });
    });

    describe('#_populateCommands', function() {
      beforeEach(function() {
        sinon.stub(lirc_node.irsend, 'list', function() {});
      });

      afterEach(function() {
        lirc_node.remotes = {};
        lirc_node.irsend.list.restore();
      });

      it('should exist', function() {
        assert(lirc_node._populateCommands instanceof Function);
      });
    });

    describe('#_populateRemoteCommands', function() {
      beforeEach(function() {
        lirc_node.remotes = {};
      });

      it('should exist', function() {
        assert(lirc_node._populateRemoteCommands instanceof Function);
      });

      it('should push commands onto the remote\'s array', function() {
        var remote = 'Microsoft_Xbox360';
        var stderr = 'irsend: 0000000000000bd7 OpenClose\nirsend: 0000000000000b9b XboxFancyButton';
        lirc_node.remotes[remote] = [];
        lirc_node._populateRemoteCommands(remote, '', '', stderr);
        assert(lirc_node.remotes[remote][0] == 'OpenClose');
        assert(lirc_node.remotes[remote][1] == 'XboxFancyButton');
      });
    });
  });
});
