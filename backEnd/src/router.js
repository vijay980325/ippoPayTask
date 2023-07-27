const express = require('express');
const app = express();

let apiPath = '/api/v1';
console.log("apiPath", apiPath)
app.use(`${apiPath}/user`, require("./components/user/user.router"));
// app.use(`${apiPath}/enrichment`, require("./components/enrichment/enrichment.router")); 

// If Path Of Api Not Found 
app.use(function (req, res, next) {
    // res.status(404);

    // respond with html page
    return res.status(404).json({
        status: 404,
        message: 'API NOT FOUND! Please check the endpoint and the HTTP request type! or contact at devops@waycool.in',
        data: {
            url: req.url
        }
    });
});

module.exports = app; 