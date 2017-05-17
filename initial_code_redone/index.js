// We import some things
var server = require("./server");
var router = require("./router");
var requestHandler = require("./request_handler")

// We declare an associative array
var handle = {};

// We add a couple of values to the array
// {'/':        [Function: start],
//  '/start':   [Function: start],
//  '/upload':  [Function: upload],
//  '/show':    [Function: show]}

handle["/"] = requestHandler.start;
handle["/start"] = requestHandler.start;
handle["/upload"] = requestHandler.upload;
handle["/show"] = requestHandler.show;

// We call the method start from the file server.js
// We give the route method from the file router.js
// and our array to the method start
server.start(router.route, handle)