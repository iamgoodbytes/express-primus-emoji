const express = require("express");
const Primus = require("primus");

const go = (server) => {
    let primus = new Primus(server, {
        /* options */
    });
    // save the client lib

    primus.on("connection", function (spark) {
        console.log("new connection");
        spark.on("data", function (data) {
            console.log("received data:", data);
            primus.write(data);
        });
    });
};

module.exports.go = go;
