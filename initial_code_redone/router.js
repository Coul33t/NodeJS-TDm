function route(handle, pathname, response, request) {

    console.log("URL processing : \"" + pathname + "\".");

    // We check if the URL correspond to an entry into our associative array
    if(typeof handle[pathname] === 'function') {
        // If it does, we call the function
        handle[pathname](response, request);
    }

    // Else, it doesn't exist
    else {
        console.log(pathname + " does not exists.");
        response.writeHead(404, {"Content-type": "text/plain"});
        response.write("404 not found.");
        response.end();
    }
}

exports.route = route