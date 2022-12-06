var http = require('http');
var fs = require('fs');
var Mustache = require('mustache');
var mysql = require('./db');




function myServerFunction(request, response) {
    if (request.url == '/freeDrones') {
        response.setHeader('Content-Type', 'application/json')
        mysql.queryDrones(data => {
            response.end(JSON.stringify(data));
        });
        return;
    }

    if (request.url == '/ordered') {
        response.end(JSON.stringify(ordered));
        return;
    }

    if (request.url.includes('.html') || request.url.includes('.css')) {
        serveStatic(request.url, response);
        return;
    }

    if (request.url.includes('/orderDrone')) {
        var formParametersString = request.url.replace('/orderDrone', '');
        var form = new URLSearchParams(formParametersString);
        var droneName = form.get('droneName');

        mysql.orderDrone(droneName, (r) => {

            if (r.affectedRows != 1) {
                response.end('404');
                return;
            }

            response.end('Drone ordered!');
        });


        return;
    }

    if (request.url.includes('/release')) {
        if (ordered.length == 0) {
            response.end('No drones to release!');
            return;
        }
        var drone = ordered.pop();
        dbOld.drones.push(drone);
        response.end(drone.name + ' released.');

        return;
    }

    if (request.url.includes('dynamic')) {
        fs.readFile('.' + request.url, function (err, fileData) {

            mysql.queryDrones(data => {
                var forMustache = { drones: data }
                var output = Mustache.render(fileData.toString(), forMustache);
                response.end(output);

            });

        });
        return;
    }


    response.end('Hello world!');
}

http.createServer(myServerFunction).listen(8080);


function serveStatic(url, res) {


    fs.readFile('./static/' + url, function (err, data) {
        res.write(data);
        return res.end();
    });

}



