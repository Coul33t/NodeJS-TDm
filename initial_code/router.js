function route(handle, pathname, response, request) {
  console.log("Début du traitement de l'URL " + pathname + ".");
  if (typeof handle[pathname] === 'function') {
    handle[pathname](response, request);
  } else {
    console.log("Aucun gestionnaire associé à " + pathname);
    response.writeHead(404, {"Content-Type": "text/html"});
    response.write("404 Non trouvé");
    response.end();
  }
}

exports.route = route;