var querystring = require("querystring"),
    fs = require("fs"),
    formidable = require("formidable");

function start(response) {
  console.log("Le gestionnaire 'start' est appelé.");

  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" '+
    'content="text/html; charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="file" name="upload" multiple="multiple">'+
    '<input type="submit" value="Transférer le fichier" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, request) {
  console.log("Le gestionnaire 'upload' est appelé.");

  var form = new formidable.IncomingForm();
  console.log("Récupération des éléments reçus");
  form.parse(request, function(error, fields, files) {
    console.log("Traitement terminé");

    /* En cas d'erreur sous Windows :
       tentative d'écrasement d'un fichier existant */
    fs.rename(files.upload.path, "test.png", function(err) {
      if (err) {
        fs.unlink("test.png");
        fs.rename(files.upload.path, "test.png");
      }
    });
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("Image reçue :<br/>");
    response.write("<img src='/show' />");
    response.end();
  });
}

function show(response) {
  console.log("Le gestionnaire 'show' est appelé.");
  fs.readFile("test.png", "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "image/png"});
      response.write(file, "binary");
      response.end();
    }
  });
}

exports.start = start;
exports.upload = upload;
exports.show = show;
