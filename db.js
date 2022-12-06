var mysql = require('mysql');

exports.queryDrones = function (callback) {
    var con = getConnection();
    const sql = 'select * from Drone where ordered = 0';
    query(con, sql, callback);
};

exports.orderDrone = function (name, callback) {
    var con = getConnection();
    var sql = "UPDATE Drone SET ordered = 1 WHERE name = '" + name + "'";
    query(con, sql, callback);
}

function query(con, sql, callback) {
    con.query(sql, function (err, result) {
        if (err)
            throw err;
        callback(result);
    });
}

function getConnection() {
    return mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "drones"
    });
}
