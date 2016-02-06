var lircNode = require('../');
var assert = require('assert');
var sinon = require('sinon');

describe('lircNode', function () {
  describe('init', function () {
    it('should exist', function () {
      assert(lircNode.init instanceof Function);
    });
  });

  describe('Setting an internal list of Remotes', function () {
    describe('#_populateRemotes', function () {
      beforeEach(function () {
        lircNode.remotes = {};
      });

      it('should exist', function () {
        assert(lircNode._populateRemotes instanceof Function);
      });

      it('should set exports.remotes as an object', function () {
        lircNode._populateRemotes(['', '']);
        assert(lircNode.remotes instanceof Object);
      });

      it('should set exports.remotes to have keys for a single remote name', function () {
        var result = ['', 'irsend: SonyTV'];

        lircNode._populateRemotes(result);

        assert(Object.keys(lircNode.remotes).length === 1);
        assert(lircNode.remotes.SonyTV instanceof Array);
      });

      it('should set exports.remotes to have keys for all remote names', function () {
        var result = ['', 'irsend: Yamaha\nirsend: Arizer\nirsend: Microsoft_Xbox360'];

        lircNode._populateRemotes(result);

        assert(Object.keys(lircNode.remotes).length === 3);
        assert(lircNode.remotes.Yamaha instanceof Array);
        assert(lircNode.remotes.Arizer instanceof Array);
        assert(lircNode.remotes.Microsoft_Xbox360 instanceof Array);
      });
    });

    describe('#_populateCommands', function () {
      beforeEach(function () {
        sinon.stub(lircNode.irsend, 'list', function () {});
      });

      afterEach(function () {
        lircNode.remotes = {};
        lircNode.irsend.list.restore();
      });

      it('should exist', function () {
        assert(lircNode._populateCommands instanceof Function);
      });
    });

    describe('#_populateRemoteCommands', function () {
      beforeEach(function () {
        lircNode.remotes = {};
      });

      it('should exist', function () {
        assert(lircNode._populateRemoteCommands instanceof Function);
      });

      it('should push commands onto the remote\'s array', function () {
        var remote = 'Microsoft_Xbox360';
        var result = ['', 'irsend: 0000000000000bd7 OpenClose\nirsend: 0000000000000b9b XboxFancyButton'];
        lircNode.remotes[remote] = [];
        lircNode._populateRemoteCommands(remote, result);
        assert(lircNode.remotes[remote][0] === 'OpenClose');
        assert(lircNode.remotes[remote][1] === 'XboxFancyButton');
      });
    });
  });
});
