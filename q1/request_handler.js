var fs = require("fs");
var formidable = require("formidable");


function start(response) {
    console.log("\"start\" called.");

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
    
    response.end(body);
}

function upload(response, request) {
    console.log("\"upload\" called.");

    var form = new formidable.IncomingForm();

    form.parse(request, function(error, fields, files) {

        fs.rename(files.upload.path, "test.png", function(err) {
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

function list(response) {
    console.log("\"list\" called.");

    var file_list = [];

    fs.readdir(".", function(err, files) {
        if(err) {
            response.writeHead(200, {"Content-type": "text/plain"});
            response.write(err + "\n");
        }
        else {
            response.writeHead(200, {"Content-type": "text/html"});
            response.write("<p>Files in current directory : <br /><ul>");

            files.forEach(function (file) {
                response.write("<li>" + file + "</li>");
            });

            response.write("</lu>");
            response.end();  
        }
        
    });


}

exports.start = start;
exports.upload = upload;
exports.show = show;
exports.list = list;