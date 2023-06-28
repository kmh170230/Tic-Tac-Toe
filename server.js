'use strict';

const http = require('http');
const fs = require('fs');

const PORT = 8080;

fs.readFile('./index.html', function (err, html) {
    if (err) console.log(err);

    http.createServer(function(req, resp) {
        resp.writeHeader(200, {"Content-Type": "text/html"});
        resp.write(html);
        resp.end();
    }).listen(PORT);
});


