var server = require("./server");
var router = require("./router");
var requestHandler = require("./request_handler")
var handle = {};

handle["/"] = requestHandler.start;
handle["/start"] = requestHandler.start;
handle["/hello"] = requestHandler.hello;
handle["/sum"] = requestHandler.sum;
handle["/test"] = requestHandler.test;
handle["/text"] = requestHandler.text;

server.start(router.route, handle)