var spawn = require('child_process').spawn;
exports = module.exports = IRReceive;

var listeningProcess, listenToInput,
    registeredInstances = 0;

function IRReceive () {
    this.callbacks = [];
    this.numCallbacks = 0;
    this.listening = false;
}

IRReceive._DEFAULT_INPUT_LISTENER = function() {
    return spawn('irw');
};
listenToInput = IRReceive._DEFAULT_INPUT_LISTENER;


function createThrottle(callback, throttleTime) {
    var lastCalled = 0;

    return function() {
        var timeNow = Date.now();
        if(timeNow > lastCalled+throttleTime) {
            callback.apply(null, arguments);
            lastCalled = timeNow;
        }
    };
}


/**
 * Registers a callback
 * @param  {String}   key      The name of the key to listen for
 * @param  {String}   remote   Optional. The name of the remote to listen for
 * @param  {Function} callback Function to execute when the key / remote combo is detected
 * @param  {Int}      throttle Optional. Omit for no throttle. If provided, read as "throttle input to one every X milliseconds". If set to 0 this will disable repeat callbacks.
 * @return {Int}               Listener id. Used to cancel the listener.
 */
IRReceive.prototype.addListener = function() {
    var key, remote, callback, throttle,
        callbackInfo = {},
        error = false,
        arg = 0;

    function parameterError() {
        throw new Error('lirc_node: IRReceive#addListener: bad parameters. Please use addListener([key,[ remote,]] callback[, throttle]);');
    }

    for(var i=0; i<arguments.length; i++) {
        if(typeof arguments[i] === 'string') {
            if(callback === undefined) {
                if(key === undefined) {
                    key = arguments[i];
                }
                else if(remote === undefined) {
                    remote = arguments[i];
                }
                else {
                    parameterError();
                }
            }
            else {
                parameterError();
            }
        }
        else if(typeof arguments[i] === 'function') {
            if(callback === undefined) {
                callback = arguments[i];
            }
            else {
                parameterError();
            }
        }
        else if(typeof arguments[i] === 'number') {
            if(callback === undefined) {
                parameterError();
            }
            else {
                throttle = arguments[i];
                break;
            }
        }
        else {
            parameterError();
        }
    }

    if(!callback) {
        parameterError();
    }

    callbackInfo.callback = callback;

    if(key) {
        callbackInfo.key = key;
    }

    if(remote) {
        callbackInfo.remote = remote;
    }

    if(throttle !== undefined && throttle !== null) {
        callbackInfo.throttle = throttle;
        if(throttle) {
            callbackInfo.callback = createThrottle(callback, throttle);
        }
    }


    id = this.callbacks.length;
    this.callbacks[id] = callbackInfo;
    this.numCallbacks++;

    if(!this.listening) {
        this._listen();
    }

    return id;
};


/**
 * Removes a listener from the pool
 * @param  {Int} listenerId The id returned when registering the listener
 */
IRReceive.prototype.removeListener = function(listenerId) {

    this.callbacks[listenerId] = null;
    this.numCallbacks--;

    if(this.numCallbacks <= 0 && this.listening) {
        this.numCallbacks = 0;
        this._stopListening();
    }
};


IRReceive.prototype._handleIRData = function(data) {
    this.callbacks.forEach(function(callback) {
        var d = IRReceive._processIRData(data);
        if(
            (callback.throttle !== 0 || parseInt(d.repeat, 10) === 0) &&
            (callback.remote === undefined || callback.remote == d.remote) &&
            (callback.key === undefined || callback.key == d.key)
        ) {
            callback.callback(d);
        }
    });
};


IRReceive.prototype._listen = function() {
    if(!this.listening) {
        if(!listeningProcess) {
            listeningProcess = listenToInput();
        }
        registeredInstances++;
        listeningProcess.stdout.on('data', this._handleIRData.bind(this));
        this.listening = true;
    }
};


IRReceive.prototype._stopListening = function() {
    if(this.listening) {
        listeningProcess.removeListener('data', this._handleIRData);
        this.listening = false;
        registeredInstances--;
        if(registeredInstances === 0) {
            IRReceive._killListeningProcess();
        }
    }
};


IRReceive._processIRData = function(data) {
    var pieces = (''+data).split(' ');
    return {
        code: pieces[0].trim(),
        repeat: pieces[1].trim(),
        key: pieces[2].trim(),
        remote: pieces[3].trim()
    };
};


IRReceive._getListeningProcess = function() {
    return listeningProcess;
};

IRReceive._killListeningProcess = function() {
    if(listeningProcess) {
        listeningProcess.kill();
        listeningProcess = undefined;
    }
    registeredInstances = 0;
};

IRReceive._setInputListener = function(fn) {
    listenToInput = fn;
};

