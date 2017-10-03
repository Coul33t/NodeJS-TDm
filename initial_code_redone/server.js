var http = require('http');
var url = require('url');

// Cette fonction est appelée au démarrage du serveur.

function start(route, handle) {
    // Cette fonction permet d'appeler la page voulue. Le paramètre request est la requête
    // envoyée par le client (l'url que vous avez tapé dans la barre d'adresse).
    function onRequest(request, response) {
        // Le chemin est parsé à partir de la requête.
        // Exemple : A partir de " http://localhost:8080/start ", pathanme = start. 
        var pathname = url.parse(request.url).pathname;
        console.log('Request received.');
        // La fonction route est appellée (voir router.js).
        route(handle, pathname, response, request);
    }

    // La création du serveur est faite ici, avec la fonction onRequest() passée en callback.
    // Cette fonction sera appelée chaque fois qu'une requête est envoyée au serveur.
    
    // exemple : vous voulez accéder à la page " start ". Vous tapez donc l'url
    // " http://localhost:8080/start ". Cet requête appelle la méthode onRequest()
    // L'adresse est parsée dans la varibla pathname, ce qui donne "start"
    // La fonction route() est ensuite appelée.
    http.createServer(onRequest).listen(8080);
    console.log("Server started.");
}

exports.start = start