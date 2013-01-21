var lirc_node = require('../'),
    assert = require('assert'),
    sinon = require('sinon');

describe('lirc_node', function() {
  describe('reload', function() {
    it('should exist', function() {
      assert(lirc_node.reload instanceof Function);
    });

    it('should call exports.irsend.list', function(done) {
      var spy = sinon.spy(lirc_node.irsend, 'list');
      lirc_node.reload(function() {
        assert(spy.called);
        done();
      });
    });
  });

  describe('#_populateRemotes', function() {
    it('should exist', function() {
      assert(lirc_node._populateRemotes instanceof Function);
    });

    it('should set exports.remotes as an object', function() {
        lirc_node._populateRemotes('', '', '');
        assert(lirc_node.remotes instanceof Object);
    });

    it('should set exports.remotes to have keys for all remote names', function() {
        var stdout = "irsend: Yamaha\nirsend: Arizer\nirsend: Microsoft_Xbox360";
        lirc_node._populateRemotes('', stdout, '');
        assert(Object.keys(lirc_node.remotes).length === 3);
        assert(lirc_node.remotes["Yamaha"] instanceof Array);
        assert(lirc_node.remotes["Arizer"] instanceof Array);
        assert(lirc_node.remotes["Microsoft_Xbox360"] instanceof Array);
    });
  });

  describe('#_populateRemoteCommands', function() {
    it('should exist', function() {
      assert(lirc_node._populateRemoteCommands instanceof Function);
    });

    it('should push commands onto the remote\'s array', function() {
      var stdout = 'irsend: 0000000000000bd7 OpenClose\nirsend: 0000000000000b9b XboxFancyButton';
      lirc_node.remotes['Microsoft_Xbox360'] = [];
      lirc_node._populateRemoteCommands('Microsoft_Xbox360', '', stdout, '');
      assert(lirc_node.remotes['Microsoft_Xbox360'][0] == 'OpenClose');
      assert(lirc_node.remotes['Microsoft_Xbox360'][1] == 'XboxFancyButton');
    });
  });
});
