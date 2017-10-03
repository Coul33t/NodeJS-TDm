// Les différents scripts sont importés
var server = require("./server");
var router = require("./router");
var requestHandler = require("./request_handler")

// Un tableau associatif est déclaré. Ce tableau contiendra les différents chemins
// possibles, ainsi que les fonctions associés (voir commentaire suivant). Ces
// fonctions sont définies dans request_handler.js
var handle = {};

// Ici, les fonctions de request_handler.js sont associés aux url. Par exemple,
// 127.0.0.1:8080/upload    -> appelle la fonction upload()
// 127.0.0.1:8080/          -> appelle la fonction start()

// {'/':        [Function: start],
//  '/start':   [Function: start],
//  '/upload':  [Function: upload],
//  '/show':    [Function: show]}
handle["/"] = requestHandler.start;
handle["/start"] = requestHandler.start;
handle["/upload"] = requestHandler.upload;
handle["/show"] = requestHandler.show;

// Ici, la fontion start() (du fichier server.js) est appellée. Cette fonction
// prend en paramètre la fonction route() de router.js, et le tableau contenant
// toutes les urls appelables.
server.start(router.route, handle)