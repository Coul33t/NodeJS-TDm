function route(handle, pathname, response, request) {

    console.log("URL processing : \"" + pathname + "\".");
    
    if(typeof handle[pathname] === 'function') {
        handle[pathname](response, request);
    }

    else {
        console.log(pathname + " does not exists.");
        response.writeHead(404, {"Content-type": "text/plain"});
        response.write("404 not found.");
        response.end();
    }
}

exports.route = route