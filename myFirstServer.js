var http = require('http');


function myServerFunction(request, response){
    response.end('Hello World!');
} 

http.createServer(myServerFunction).listen(8080);

