var lirc_node = require('../'),
    assert = require('assert'),
    sinon = require('sinon'),
    ChildProcess = require('child_process');

describe('IRSend', function() {
  var irsend = new lirc_node.IRSend();

  describe('#_list', function() {
    it('should have a list function', function() {
      irsend._list.should.be.an.instanceOf(Function);
    });

    it("should, by default, return: irsend \"\" \"\"", function() {
      irsend._list().should.equal("irsend \"\" \"\"")
    });

    it('should take a remote argument', function() {
      irsend._list('yamaha').should.equal("irsend yamaha \"\"");
    });

    it('should take a remote and a code argument', function() {
      irsend._list('yamaha', 'KEY_POWER').should.equal('irsend yamaha KEY_POWER');
    });
  });

});
