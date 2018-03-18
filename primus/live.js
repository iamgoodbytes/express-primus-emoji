exports.go = function(server) {
    const Primus = require('primus');
    var primus = new Primus(server, {});

    primus.on('connection', function connection(spark) {

        spark.on('data', function (data) {
            primus.write(data);
            primus.write({ whatever: 'youwant' });
        });

    });

}