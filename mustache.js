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

        var result = dbOld.drones.find(x => x.name == droneName);
        if (result == undefined) {
            response.end('404');
            return;
        }

        var index = dbOld.drones.findIndex(x => x.name == droneName);
        dbOld.drones.splice(index, 1);

        ordered.push(result);

        response.end('Drone ordered!');
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
                var forMustache = {drones: data}
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

var ordered = [];

var dbOld =
{
    drones: [
        {
            name: 'BeeDrone',
            lat: -38.54543,
            long: 166.4324,
            img: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZHJvbmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"

        },
        {
            name: 'Adorable Sensors',
            lat: -43.54543,
            long: 33.4324,
            img: "https://images.unsplash.com/photo-1508444845599-5c89863b1c44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZHJvbmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"

        },
        {
            name: 'Blue Twirls',
            lat: 15.54543,
            long: 90.4324,
            img: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZHJvbmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"

        },
        {
            name: 'Brigth Skies',
            lat: 45.54543,
            long: 166.4324,
            img: "https://images.unsplash.com/photo-1479152471347-3f2e62a2b2a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGRyb25lfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
        }
    ]
};