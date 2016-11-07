// The following example use the jQuery on() method, which attach one (or more) event handler for the element.
// here, we attach a " request " handler on the server (look here for all event sent by the http module : https://nodejs.org/api/http.html).
// From the doc : " Emitted each time there is a request. ". Each time the server receive a request, the callback function will be called.

// Note that :
// var server = http.createServer(function(request, response) { });

// is similar to :
// var server = http.createServer()
// server.on('request', function(request, response) { });

// (see https://nodejs.org/api/http.html#http_http_createserver_requestlistener for more informations).

// So, we could also write it like this :

// We create the server
var server = http.createServer()

// We attach a " request " handler on the server
server.on('request', function(request, response) {

    // We explicitly write the header
    response.writeHead(200, {"Content-type": "text/html"});

    // We parse the page called
    var page = url.parse(request.url).pathname;
    // We parse the arguments sent
    var params = querystring.parse(url.parse(request.url).query);

    // if the url is : localhost:8080/hello?name=[name]&surname=[surname]
    if(page == '/hello' && 'name' in params && 'surname' in params) {
        response.write('<p><h2>' + params['name'] + ' ' + params['surname'] + ', bienvenue sur la page d\'accueil.</h2></p>');
    }
    // else, if the url is localhost:8080/yo
    else if(page == '/yo') {
        response.write('<p><h1>Wesh</h1></p>');
    }
    // else, the page does not exists, we overwrite the header and send a 404 code (Not found).
    else {
        response.writeHead(404);
    }

    // We close the stream
    response.end();
});

// The server is listening
server.listen(8080);