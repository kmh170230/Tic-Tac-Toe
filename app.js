'use strict';

const express = require('express');

const app = express();
const PORT = 8080;

app.use(express.static("public"));
app.listen(PORT);

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});
