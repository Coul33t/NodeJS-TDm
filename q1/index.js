var server = require("./server");
var router = require("./router");
var requestHandler = require("./request_handler")
var handle = {};

handle["/"] = requestHandler.start;
handle["/start"] = requestHandler.start;
handle["/upload"] = requestHandler.upload;
handle["/show"] = requestHandler.show;
handle["/list"] = requestHandler.list;

server.start(router.route, handle)