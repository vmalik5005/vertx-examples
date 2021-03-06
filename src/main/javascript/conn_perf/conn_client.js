/*
 * Copyright 2011-2012 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var vertx = require('vertx')
var console = require('console')

// We set the buffer sizes small so we don't run out of RAM - each connection
// will have its own buffer

// You will also probably need to increase your ulimit for file handles
// default maximum is really small on most OSes.
// Google it to find out how to do that, it depends on your OS

// The other barrier you will hit on the client side is each connection gets its
// own ephemeral port on the client side, and all ports must like 0-65535
// So to really test how many connections vert.x can handle, you need to test the
// server with multiple clients on different machines.

var client = vertx.createNetClient().sendBufferSize(2048).receiveBufferSize(2048);

var numConns = 50000;

var received = 0;

connect(0);

function connect(num) {
  client.connect(1234, 'localhost', function(err, sock) {
    console.log("connected " + num);

    sock.dataHandler(function(buffer) {
      console.log("received " + received);
      received++;
    });

    sock.write("X");

    num++;
    if (num < numConns) {
      vertx.runOnContext(function() { connect(num) });
    }
  });

}



