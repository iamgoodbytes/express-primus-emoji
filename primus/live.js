exports.go = function(server) {
    const Primus = require('primus');
    var primus = new Primus(server, {});

    primus.on('connection', function connection(spark) {
        console.log("Primus server connection 🐴");
        
        primus.write('Hey sparks, here is some data! ☕️');

        spark.on('data', function (data) {
            console.log("Data from spark ⚡️")
        });

    });

}