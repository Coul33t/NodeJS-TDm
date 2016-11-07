var fs = require("fs");
var formidable = require("formidable");


function start(response) {
    console.log("\"start\" called.");
    // This function (writeHead) explicitly send the header
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
    // End of the stream. The function end() can take an argument, which is the last bit of information to send.
    // We could have used :
    // response.write(body);
    // response.end();
    response.end(body);
}

function upload(response, request) {
    console.log("\"upload\" called.");

    // We create a new formidable Form
    var form = new formidable.IncomingForm();

    form.parse(request, function(error, fields, files) {
        // We upload and name the uploaded file "test.png"
        fs.rename(files.upload.path, "test.png", function(err) {
            // if it already exists, we remove the old file (unlink)
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

    // We read the file
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