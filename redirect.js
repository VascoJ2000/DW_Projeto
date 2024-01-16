const express = require('express');
const httpApp = express();
const http = require('http');

httpApp.get("*", function(req, res, next) {
    res.redirect("https://" + req.headers.host + req.path);
});
http.createServer(httpApp).listen(80, function() {
    console.log("Express HTTP server listening on port 80");
});