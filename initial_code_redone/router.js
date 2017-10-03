// Cette fonction sert à appeler la fonction demandée (pathname). Les vérifications
// de l'existence de la fonction sont faites ici.

function route(handle, pathname, response, request) {

    console.log("URL processing : \"" + pathname + "\".");

    // On vérifie ici que la fonction demandée existe dans le tableau associatif.
    // Si elle existe, on peut donc appeler la fonction.
    if(typeof handle[pathname] === 'function') {      
        handle[pathname](response, request);
    }

    // Sinon, elle n'existe pas, on renvoie une erreur 404 au client.
    else {
        console.log(pathname + " does not exists.");
        response.writeHead(404, {"Content-type": "text/plain"});
        response.write("404 not found.");
        response.end();
    }
}

exports.route = route