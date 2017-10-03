var fs = require("fs");
var formidable = require("formidable");

// Ce fichier contient le code à proprement parler. Ces fonctions sont appelés
// par router.js lorsque le client envoie une requête ( = tape une url).

function start(response) {
    console.log("\"start\" called.");
    // writeHead permet d'envoyer explicitement le header.
    response.writeHead(200, {"Content-type": "text/HTML"});
    var body =  '<html>'+
                '<head>'+
                '<meta http-equiv="Content-Type" '+
                'content="text/html; charset=UTF-8" />'+
                '</head>'+
                '<body>'+
                '<form action="/upload" enctype="multipart/form-data" method="post">' +
                '<input type="text" name="title"><br>' +
                '<input type="file" name="upload" multiple="multiple"><br />' +
                '<input type="submit" value="Upload">' +
                '</form>' +
                '</head>' +
                '</html>';
    // Fin du flux. la fonction end() peut prendre un argument, qui sera les 
    // dernières informations envoyées dans le flux avant de le fermer.
    // Nous aurions pu utiliser, à la place :
    // response.write(body);
    // response.end();
    response.end(body);
}

function upload(response, request) {
    console.log("\"upload\" called.");

    // Un formulaire Formidable est créé
    var form = new formidable.IncomingForm();

    form.parse(request, function(error, fields, files) {
        // On upload et nomme le fichier " test.png "
        fs.rename(files.upload.path, "test.png", function(err) {
            // Si le fichier existe déjà, on efface l'ancien (fonction unlink())
            if (err) {
                fs.unlink("test.png");
                fs.rename(files.upload.path, "test.png");
            }
        });

        response.writeHead(200, {"Content-type": "text/html"});
        response.write("Received picture : <br />");
        response.write("<img src='/show' />");
        response.end();
    });
}

function show(response) {
    console.log("\"show\" called.");

    // le fichier est lu
    fs.readFile("test.png", "binary", function(error, file) {
        if(error) {
            response.writeHead(200, {"Content-type": "text/plain"});
            response.write(error + "\n");
            response.end();
        }
        else {
            response.writeHead(200, {"Content-type": "image/png"});
            response.write(file, "binary");
            response.end();
        }
    });
}

exports.start = start;
exports.upload = upload;
exports.show = show;