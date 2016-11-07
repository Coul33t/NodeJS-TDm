var server = require("./server");
var router = require("./router");
var requestHandler = require("./request_handler")
var handle = {};

handle["/"] = requestHandler.start;
handle["/start"] = requestHandler.start;
handle["/display"] = requestHandler.display;
handle["/add"] = requestHandler.add;

server.start(router.route, handle)