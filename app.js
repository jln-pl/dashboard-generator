var express = require('express'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    routes = require('./routes'),
    config = require('./config/config').config,
    app = express(),
    configValidator = new (require('./validators/configValidator'))(config),
    MongoClient = require('mongodb').MongoClient,
    connectionString;

try {
    configValidator.validate();
    connectionString = 'mongodb://' + config.mongo.host + ':' + config.mongo.port + '/' + config.databaseName;
} catch(ex) {
    console.log(ex);
    return;
}

MongoClient.connect(connectionString, function (err, db) {
    if (err) throw err;

    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'hbs');

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    routes(app, db, config);

    app.listen(3000);
    console.log("Listen on port 3000...");
});




