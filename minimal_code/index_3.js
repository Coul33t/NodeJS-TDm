// We can also declare the callback function itself, and then call it later

function start(request, response) {
    response.writeHead(200, {"Content-type": "text/html"});

    var page = url.parse(request.url).pathname;
    var params = querystring.parse(url.parse(request.url).query);

    if(page == '/hello' && 'name' in params && 'surname' in params) {
        response.write('<p>' + params['name'] + ' ' + params['surname'] + ', bienvenue sur la page d\'accueil.</p>');
    }
    else if(page == '/yo') {
        response.write('<p>Wesh</p>');
    }
    else {
        response.writeHead(404);
    }
    response.end();
}

var server = http.createServer();

// We call the callback function here, but we wrote it before.
// This is the " traditionnal " way you're probably used to see.
// Be aware that it's usually written like in the index_1.js file.
server.on('request', start(request, response));
server.listen(8080);