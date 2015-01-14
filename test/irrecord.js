var lirc_node = require('../'),
    assert = require('assert'),
    sinon = require('sinon');

describe('IRRecord', function() {
  var irrecord = new lirc_node.IRRecord();

  describe('#list', function() {
    it('should call startIRRecord and call the callback', function(done) {
      irrecord.startIRRecord(function() {
        done();
      });
    });
  });

  describe('#send_once', function() {
    it('should call the callback', function(done) {
      irrecord.finishIRRecord(function() {
        done();
      });
    });
  });
 
});
