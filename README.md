lirc_node
=========

``lirc_node`` is an npm module that acts as a very thin shim between
[LIRC](http://lirc.org) and Node.

It's designed to be used in a situation where you wish to control infrared
devices using LIRC from a Node application.

It is a part of the [Open Source Universal Remote](http://opensourceuniversalremote.com) project.

[![Build Status](https://travis-ci.org/alexbain/lirc_node.png)](https://travis-ci.org/alexbain/lirc_node)

## What is this?

LIRC is a fantastic open source software package that allows you to send and
receive infrared commands from Linux. It comes with a number of command line
executables that can be called to accomplish this.

This module provides a wrapper around certain LIRC command line executables so
that you can make LIRC calls from within a NodeJS app. At this time (v0.0.4) the
only excutables that have a wrapper are ``irsend`` and ``irw``. [irsend](http://www.lirc.org/html/irsend.html)
is used to send infrared commands. I have attempted to emulate every option and
command that ``irsend`` currently documents on it's API page. There is a full
test suite that can be ran to ensure that these options and commands work correctly. 
[irw](http://www.lirc.org/html/irw.html) is used to monitor the infra red receiver
for incoming signals. Listeners for specific keys and/or remotes can be added with
callback functions to handle the event.

In a future version I hope to add support for calling additional LIRC executables.
I have my eye on being able to call the ``irrecord`` executable from NodeJS to
teach LIRC new remotess / commands from a Node app. Given that ``irrecord`` requires
some back and forth via the command line I haven't attempted it just yet. If you,
the awesome developer reading this, has any ideas please don't hesitate
to email me or take a stab at it yourself.


## Why does this exist?

I wrote this module as part of a personal project to make a completely open
hardware and open source universal remote. I was frustrated at existing solutions
that were closed source and didn't allow me to extend upon or improve them.

If you're interested in seeing an example of this module in use please check
out the [Open Source Universal Remote](http://opensourceuniversalremote.com) project.
This project contains an example application that uses this module in a NodeJS app.

## How do I use it?

I recommend checking out the [Open Source Universal Remote](http://opensourceuniversalremote.com)
project to see an example implementation.

The ``lirc_node`` module will only discover remotes and commands that LIRC already
knows about. You'll need to program those remotes and commands using the ``irrecord``
utility. If this sounds like gibberish to you, I'd recommend reading about
[LIRC](http://www.lirc.org/) and [irrecord](http://www.lirc.org/html/irrecord.html)
before proceeding.

Here is a very simple example of how to use the ``lirc_node`` module in
a node app. I recommend reading through the source code for full details or to
answer any ambiguities. There are additional options that are not shown here.

    // Sending commands
    lirc_node = require('lirc_node');
    lirc_node.init();

    // To see all of the remotes and commands that LIRC knows about:
    console.log(lirc_node.remotes);

    /*
      Let's pretend that the output of lirc_node.remotes looks like this:

      {
        "tv": ["Power", "VolumeUp", "VolumeDown"],
        "xbox360": ["Power", "A", "B"]
      }
    */

    // Tell the TV to turn on
    lirc_node.irsend.send_once("tv", "power", function() {
      console.log("Sent TV power command!");
    });

    // Tell the Xbox360 to turn on
    lirc_node.irsend.send_once("xbox360", "power", function() {
      console.log("Sent Xbox360 power command!");
    });


    // Listening for commands
    var listenerId = lirc_node.addListener(function(data) {
      console.log("Received IR keypress '" + data.key + "'' from remote '" + data.remote +"'");
    });

    lirc_node.addListener('KEY_UP', 'remote1', function(data) {
      console.log("Received IR keypress 'KEY_UP' from remote 'remote1'");
      // data also has `code` and `repeat` properties from the output of `irw`
      // The final argument after this callback is a throttle allowing you to 
      // specify to only execute this callback once every x milliseconds.
    }, 400);




## Development

Would you like to contribute to and improve this module? Fantastic. To contribute
patches, run tests or benchmarks, make sure to clone the repository:

```
git clone git://github.com/alexbain/lirc_node.git
```

Then:

```
cd lirc_node
npm install
```

You can run the test suite by running:

```
make test
```

## Contributing

Before you submit a pull request with your change, please be sure to:

* Add new tests that prove your change works as expected.
* Ensure all existing tests are still passing.

Once you're sure everything is still working, open a pull request with a clear
description of what you changed and why. I will not accept a pull request which
breaks existing tests or adds new functionality without tests.

The exception to this would be refactoring existing code or changing documentation.


## License

(The MIT License)

Copyright (c) 2013-2015 Alex Bain &lt;alex@alexba.in&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
