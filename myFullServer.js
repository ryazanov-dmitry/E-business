var http = require('http');
var fs = require('fs');


function myServerFunction(request, response) {
    if (request.url == '/freeDrones') {
        response.setHeader('Content-Type', 'application/json')
        response.end(JSON.stringify(availableDrones))
    }
    if (request.url.includes('/orderDrone')) {
        processRequest(request, response);
        return;
    }
    if (request.url.includes('.html') || request.url.includes('.css')) {
        serverStatic(request.url, response);
        return;
    }

    response.end('Server is working! Please specify correct path.');
}

http.createServer(myServerFunction).listen(8080);

function processRequest(req, res) {
    var form = new URLSearchParams(req.url.replace('/orderDrone',''));
    var droneName = form.get('droneName');
    
    //find drone by name
    var result = availableDrones.filter(x => x.name == droneName);

    if (result.length === 0) {
        res.end('No drone with such name.');
        return;
    }
    
    availableDrones.splice(
        availableDrones.findIndex(x => x.name == droneName), 1
    );

    res.end('Drone ordered!');
}

function serverStatic(url, res) {
    fs.readFile('./static' + url, function (err, data) {
        if (err) {
            console.log(err.message)
            return;
        }
        
        setContentType(url, res);
        res.write(data);
        return res.end();
    });
}

function setContentType(url, res) {
    switch (url.split('.')[1]) {
        case 'css':
            res.setHeader('Content-Type', 'text/css');
            return;
        case 'html':
            res.setHeader('Content-Type', 'text/html');
            return;
        default:
            res.setHeader('Content-Type', 'text/plain');            
    }
}


var availableDrones = [
    {
        name: 'BeeDrone',
        lat: -38.71568,
        long: 166.25189
    },
    {
        name: 'Adorable Sensors',
        lat: 44.94397,
        long: -45.89169
    },
    {
        name: 'Blue Twirls',
        lat: -79.35272,
        long: -69.26030

    },
    {
        name: 'Bright Skies',
        lat: -19.13399,
        long: 123.54286
    }
];

