var http = require('http');


function myServerFunction(request, response) {
    if (request.url == '/freeDrones') {
        response.setHeader('Content-Type', 'application/json')
        response.end(JSON.stringify(availableDrones))
    }

    response.end('Server is working! Please specify correct path.');
}

http.createServer(myServerFunction).listen(8080);




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

