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

var client = vertx.createHttpClient().port(4443).ssl(true).trustAll(true);

client.getNow('/', function(resp) {
  console.log("Got response " + resp.statusCode());
  resp.bodyHandler(function(body) {
    console.log("Got data " + body);
  })
});