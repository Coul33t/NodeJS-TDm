var url = require('url');
var fs = require("fs");


function start(response) {
    console.log("\"start\" called.");

    response.writeHead(200, {"Content-type": "text/HTML"});
    var body =  '<html>'+
                '<head>'+
                '<meta http-equiv="Content-Type" '+
                'content="text/html; charset=UTF-8" />'+
                '</head>'+
                '<body>'+
                '<h1> WELCOME TO THE 3RD QUESTION ! </h1>'+
                '</body>'+
                '</head>'+
                '</html>';
    
    response.end(body);
}

// Displaying a memo (localhost:8080/display?{memo_index})
function display(response, request) {
    console.log("\"display\" called.");

    var params = url.parse(request.url).query;

    // If parameters were given
    if(params) {

        // We open the file, and read the content
        // fs.readFile(path, encodage, callback)
        fs.readFile(params, 'utf-8', function(error, data) {
            if(error) {
                console.log("Error : " + error);
            }

            else {
                // We output to the console AND we call the write_to_array function (which write the data into an array)
                console.log("Raw data : " + data);
                write_to_array(data, response);
            }
        });
    }
}

// Adding a memo (localhost:8080/add?{memo_index}&{value})
// If the memo exists, append the value to the end
// If it doesn't, create the memo and add the value inside
function add(response, request) {
    console.log("\"add\" called.");

    var params = url.parse(request.url).query;

    // if parameters were given
    if(params) {

        // We split the parameters where the "&" characters are
        // example : localhost:8080/add?1&yo -> {"1", "yo"}
        params = params.split("&");

        // if the split worked (params is an array) AND there are two parameters (namely the memo number and the value)
        if(Array.isArray(params) && params.length === 2){

            // We open the memo
            // fs.access(path, mode, callback)
            fs.access(params[0], fs.F_OK, function(error) {
                
                // If the file doesn't exist
                if(error) {
                    console.log("No such file. Creating " + params[0] + " ...");

                    // We create a file, and put the input value in it
                    // We add a "&" for display purpose (see function write_to_array)
                    // fs.writeFile(path, value, callback)
                    fs.writeFile(params[0], params[1]+'&', function(error) {
                        if(error) {
                            console.log("Error : " + error);
                        }

                        else {
                            console.log("File created.");
                        }
                    });
                }

                // If the file exists
                else {
                    // We append the value at the end of the file
                    // We add a "&" for display purpose (see function write_to_array)
                    // fs.appendFile(path, value, callback)
                    fs.appendFile(params[0], params[1]+'&', function (error) {
                        if(error) {
                            console.log("Error : " + error);
                        }

                        else {
                            console.log(params[1] + " appended to " + params[0]);
                        }
                    });
                }
            });

        }

    }

    response.end();
}


exports.start = start;
exports.display = display;
exports.add = add;

// Used in display, to output the data to an array
function write_to_array(data, response) {
    response.writeHead(200, {"Content-type": "text/HTML"});
    
    var body =  '<html>'+
                '<head>'+
                '<meta http-equiv="Content-Type" '+
                'content="text/html; charset=UTF-8" />'+
                '</head>'+
                '<body>'+
                '<h1> WELCOME TO THE 3RD QUESTION ! </h1>' +
                '<h3> Memos : </h3><br />';

    var new_data = data.split("&");

    for (var i = 0; i < new_data.length; i++) {
        body = body + new_data[i] + "<br />";
    }

    body = body + '</body>' + '</head>' + '</html>';

    response.write(body);
    response.end();
}