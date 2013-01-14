var lirc_node = require('../'),
    assert = require('assert'),
    sinon = require('sinon');

describe('IRSend', function() {
  var irsend = new lirc_node.IRSend();

  describe('#_list', function() {
    it('should, by default, return: irsend "" ""', function() {
      assert.equal(irsend._list(), 'irsend "" ""');
    });

    it('should use the remote argument', function() {
      assert.equal(irsend._list('yamaha'), "irsend yamaha \"\"");
    });

    it('should use the remote and code arguments', function() {
      assert.equal(irsend._list('yamaha', 'KEY_POWER'), 'irsend yamaha KEY_POWER');
    });
  });

  describe('#list', function() {
    it('should call the callback', function(done) {
      irsend.list('yamaha', 'KEY_POWER', function() {
        done();
      });
    });
  });

});
