"use strict";
const express = require("express");
const app = express();
const search = require("./api/search.js");
const accessDB = require("./api/accessDB.js");

app.get("/api/imagesearch/:search*", function(req,res) {
    search(req.params.search, req.query).then(
        arr => res.status(200).send(JSON.stringify(arr)),
        err => res.status(400).send({ERROR: err})
    );
});

app.get("/api/latest/imagesearch", function(req,res) {
    accessDB.history().then(
        arr => res.status(200).send(JSON.stringify(arr))
    );
});

app.listen(process.env.PORT || 8080);