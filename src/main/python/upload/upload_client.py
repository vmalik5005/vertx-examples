# Copyright 2011 the original author or authors.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import vertx
from core.file_system import FileSystem
from core.streams import Pump

client = vertx.create_http_client()
client.port = 8080
client.host = "localhost"

fs = vertx.file_system()

def response_handler(resp):
    print "Response %d"% resp.status_code

req = client.put("/someurl", response_handler)
filename = "upload/upload.txt"

def file_props(err, props):
    print "in file_props"
    req.put_header("Content-Length", "%s" % props.size)

    def open_handler(err, file):
        print "in open handler"
        pump = Pump(file, req)

        def end_handler(stream):
            req.end()
        file.end_handler(end_handler)
        pump.start()

    fs.open(filename, handler=open_handler)
    print "called open"

fs.props(filename, file_props)
