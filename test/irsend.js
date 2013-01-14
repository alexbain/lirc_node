var lirc_node = require('../'),
    assert = require('assert'),
    sinon = require('sinon');

describe('IRSend', function() {
  var irsend = new lirc_node.IRSend();

  describe('#list', function() {
    it('should call the callback', function(done) {
      irsend.list('yamaha', 'KEY_POWER', function() {
        done();
      });
    });
  });

  describe('#send_once', function() {
    it('should call the callback', function(done) {
      irsend.send_once('yamaha', 'KEY_POWER', function() {
        done();
      });
    });
  });

  describe('#send_start', function() {
    it('should call the callback', function(done) {
      irsend.send_start('yamaha', 'KEY_POWER', function() {
        done();
      });
    });
  });

  describe('#send_stop', function() {
    it('should call the callback', function(done) {
      irsend.send_stop('yamaha', 'KEY_POWER', function() {
        done();
      });
    });
  });

  describe('#simulate', function() {
    it('should call the callback', function(done) {
      irsend.simulate('00110101001 BEEP BEEP', function() {
        done();
      });
    });
  });

  describe('#set_transmitters', function() {
    it('should call the callback', function(done) {
      irsend.set_transmitters(1, function() {
        done();
      });
    });
  });

  // Internal methods
  describe('#_list', function() {
    it('should, by default, return: irsend LIST "" ""', function() {
      assert.equal(irsend._list(), 'irsend LIST "" ""');
    });

    it('should use the remote argument', function() {
      assert.equal(irsend._list('yamaha'), 'irsend LIST "yamaha" ""');
    });

    it('should use the remote and code arguments', function() {
      assert.equal(irsend._list('yamaha', 'KEY_POWER'), 'irsend LIST "yamaha" "KEY_POWER"');
    });
  });

  describe('#_send_once', function() {
    it('should generate empty strings on bad arguments', function() {
      assert.equal(irsend._send_once(), 'irsend SEND_ONCE "" ""');
    });

    it('should generate valid irsend command with remote and code arguments', function() {
      assert.equal(irsend._send_once('yamaha', 'KEY_POWER'), 'irsend SEND_ONCE "yamaha" "KEY_POWER"');
    });

    it('should handle an array of codes', function() {
      assert.equal(
        irsend._send_once('yamaha', ['KEY_POWER', 'KEY_VOLUMEUP', 'KEY_VOLUMEDOWN']), 
        'irsend SEND_ONCE "yamaha" "KEY_POWER" "KEY_VOLUMEUP" "KEY_VOLUMEDOWN"'
      );
    });
  });

  describe('#_send_start', function() {
    it('should generate empty strings on bad arguments', function() {
      assert.equal(irsend._send_start(), 'irsend SEND_START "" ""');
    });

    it('should generate valid irsend command with remote and code arguments', function() {
      assert.equal(irsend._send_start('yamaha', 'KEY_POWER'), 'irsend SEND_START "yamaha" "KEY_POWER"');
    });
  });

  describe('#_send_stop', function() {
    it('should generate empty strings on bad arguments', function() {
      assert.equal(irsend._send_stop(), 'irsend SEND_STOP "" ""');
    });

    it('should generate valid irsend command with remote and code arguments', function() {
      assert.equal(irsend._send_stop('yamaha', 'KEY_POWER'), 'irsend SEND_STOP "yamaha" "KEY_POWER"');
    });
  });

  describe('#_set_transmitters', function() {
    it('should allow for setting 1 transmitter', function() {
      assert.equal(irsend._set_transmitters(1), 'irsend SET_TRANSMITTERS 1');
    });

    it('should allow for setting 3 transmitters', function() {
      assert.equal(irsend._set_transmitters([1, 3, 5]), 'irsend SET_TRANSMITTERS 1 3 5');
    });
  });

  describe('#_simulate', function() {
    it('should forward along a command', function() {
      assert.equal(
        irsend._simulate("0000000000000476 00 OK TECHNISAT_ST3004S"), 
        'irsend SIMULATE "0000000000000476 00 OK TECHNISAT_ST3004S"'
      );
    });
  });

});
