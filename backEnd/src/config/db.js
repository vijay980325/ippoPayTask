// const mongoose = require('mongoose')
// const chalk = require('chalk');
// const {
//   log,
//   error,
//   info
// } = require('../utils/logging');

// const connectionString = `${process.env.Protocol}${process.env.DB_USERNAME}:${process.env.DB_PASSWD}@${process.env.Host}/${process.env.DatabaseName}`

// function connectDb() {
//   mongoose.connect(connectionString, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   });

//   mongoose.connection.on('connected', function () {
//     info(chalk.blue(' [ ✓ ] ') + 'Application - Connected to MongoDb');
//   });

//   mongoose.connection.on('error', function (err) {
//     error('Mongoose default connection has occured ' + err + ' error')
//   });

//   mongoose.connection.on('disconnected', function () {
//     info('Mongoose default connection is disconnected')
//   });

//   process.on('SIGINT', function () {
//     mongoose.connection.close(function () {
//       info('Mongoose default connection is disconnected due to application termination')
//     });
//   });

//   mongoose.set("debug", false)
// }

// module.exports = connectDb();

const mongoose = require('mongoose');

// Replace 'mydatabase' with the name of your database
const connectionString = 'mongodb://localhost:27017/ippopay';

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

db.once('open', () => {
    console.log('Connected to MongoDB successfully!');
});
