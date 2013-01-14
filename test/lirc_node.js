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
  });
});
