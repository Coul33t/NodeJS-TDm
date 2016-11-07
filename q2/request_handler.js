var url = require('url');
var querystring = require('querystring');
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
                '<h1> WELCOME TO THE 2ND QUESTION ! </h1>'+
                '</body>'+
                '</head>'+
                '</html>';
    
    response.end(body);
}

function hello(response, request) {
    console.log("\"hello\" called.");

    var params = url.parse(request.url).query;

    response.writeHead(200, {"Content-type": "text/HTML"});

    if(params){
        response.write("Hello " + params + " !");
    }

    else {
        response.write("Hello World !");
    }
    
    response.end();

}

function sum(response, request) {
    console.log("\"sum\" called.");

    var params = url.parse(request.url).query;

    response.writeHead(200, {"Content-type": "text/HTML"});

    if(params) {

        params = params.split("&");

        if(Array.isArray(params) && params.length === 2){
            var res = parseInt(params[0]) + parseInt(params[1]);

            if(!isNaN(res)) {
                response.write(params[0] + " + " + params[1] + " = " + res);                   
            }

            else {
                response.write("Only numbers.");
            }
            
        }
    }

    else {
        response.write("No parameters specified.");
    }
    
    response.end();

}

function text(response, request) {
    console.log("\"text\" called.");

    var params = url.parse(request.url).query;
    var ok = true;

    if(params) {
        var regex = /.+\.txt/

        if(!regex.test(params)) {
            params = params + ".txt";
        }

        try {
            var text = fs.readFileSync(params, "utf-8");    
        } catch(error) {
            console.log("Error : " + error);
            ok = false;
        }

        if(ok) {
            response.write(text);
        }       
    }

    else {
        response.write("No parameters specified.");
    }

    response.end();
}

function test(response, request) {
    console.log("\"test\" called.");

    var params = url.parse(request.url).query;

    if(params) {
        test_regex(response, request, params);
    }

    else {
        console.log("No parameters.");
    }
    
}

exports.start = start;
exports.hello = hello;
exports.sum = sum;
exports.test = test;
exports.text = text;


function test_params(response, request, params) {
    console.log("Params test");

    console.log("Full :");
    console.log(params);

    params = params.split("&");

    console.log("Splitted :");
    console.log(params);

    console.log(Array.isArray(params));
}


function test_regex(response, request, params) {
    console.log("Regex test");

    var regex = /.+\.txt/

    console.log(regex.test(params));
}