var lircNode = require('../'),
    assert = require('assert'),
    sinon = require('sinon'),
    q = require('q');

describe('lircNode', function() {
  describe('init', function() {
    it('should exist', function() {
      assert(lircNode.init instanceof Function);
    });
  });

  describe("Setting an internal list of Remotes", function() {
    describe('#_populateRemotes', function() {
      beforeEach(function() {
        lircNode.remotes = {};
      });

      it('should exist', function() {
        assert(lircNode._populateRemotes instanceof Function);
      });

      it('should return an object of remote names', function () {
        var remotes = lircNode._populateRemotes(['', '']);
        assert(remotes instanceof Object);
      });

      it('should set exports.remotes to have keys for a single remote name', function() {
        var result = ['', 'irsend: SonyTV'];
        var remotes = lircNode._populateRemotes(result);

        assert(Object.keys(remotes).length === 1);
        assert(remotes.SonyTV instanceof Array);
      });

      it('should set exports.remotes to have keys for all remote names', function () {
        var result = ['', 'irsend: Yamaha\nirsend: Arizer\nirsend: Microsoft_Xbox360'];
        var remotes = lircNode._populateRemotes(result);

        assert(Object.keys(remotes).length === 3);
        assert(remotes.Yamaha instanceof Array);
        assert(remotes.Arizer instanceof Array);
        assert(remotes.Microsoft_Xbox360 instanceof Array);
      });
    });

    describe('#_populateCommands', function() {
      beforeEach(function() {
        sinon.stub(lircNode.irsend, 'list', function() {});
      });

      afterEach(function() {
        lircNode.remotes = {};
        lircNode.irsend.list.restore();
      });

      it('should exist', function() {
        assert(lircNode._populateCommands instanceof Function);
      });
    });

    describe('#_parseCommands', function () {
      it('should return an array with the remote\'s commands', function () {
        var remote = 'Microsoft_Xbox360';
        var result = ['', 'irsend: 0000000000000bd7 OpenClose\nirsend: 0000000000000b9b XboxFancyButton'];
        lircNode.remotes[remote] = [];
        var commands = lircNode._parseCommands(result);
        assert(commands[0] === 'OpenClose');
        assert(commands[1] === 'XboxFancyButton');
      });
    });
  });
});
