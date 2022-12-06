var mysql = require('mysql');

exports.queryDrones = function (callback) {

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "drones"
    });

    con.connect(function (err) {
        con.query('select * from Drone', function (err, result) {
            if (err) throw err;
            
            callback(result)
        });
    });

};