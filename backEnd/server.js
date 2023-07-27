require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');//log request add depends http request
const mongoSanitize = require('express-mongo-sanitize');//nosql injection 
const cors = require('cors');//http server validation 
// const chalk = require('chalk');//style console log output
const helmet = require('helmet');// security from http server
const path = require("path")// find the path of the folder
const cluster = require('cluster')
const numCPUs = require('os').cpus().length;
const bodyParser = require('body-parser');

const enviroment = process.env.NODE_ENV || 'Local';

app.use(morgan('combined'));
app.listen(4003, () => {
    console.log(` 4003 App Running `);
});
console.log(`Worker ${process.pid} started`);
require('./src/config/db');


// MiddleWares 

app.use(express.urlencoded({ extended: true, limit: '15mb' }));
app.use(express.json({ extended: true, limit: '15mb' }));
app.use("/public/image", express.static('src/utils/public/image'));

// app.use(morgan('combined', { stream: accessLogStream }))
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.set('view engine', 'ejs')
require('./src/config/db');
app.use(require('./src/router'));

