/**
 * Module dependencies.
 */

var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var socketIO =  require('socket.io');

var mongoose = require('mongoose');
var passport = require('passport');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Load configurations
// if test env, load example file
var env = process.env.NODE_ENV || 'development'
        , config = require('./config/config')[env]
        , mongoose = require('mongoose')

// Bootstrap db connection
mongoose.connect(config.db, function(err){
    if(err){
        console.log('An error ocurred connecting to the database: ', err);
    }
});

// Bootstrap models
var models_path = __dirname + '/app/models'
fs.readdirSync(models_path).forEach(function (file) {
    require(models_path + '/' + file)
})

require('./config/db-fixture')()


var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use('/', express.static(path.join(__dirname, '../KeepMeSafe.Web/dist')));
app.use(passport.initialize());

// Bootstrap routes
var routes_path = __dirname + '/app/api';
fs.readdirSync(routes_path).forEach(function (file) {
    require(routes_path + '/' + file)(router);
});
app.use('/api', router);

// Bootstrap sockets
var sockets_path = __dirname + '/app/sockets';
fs.readdirSync(sockets_path).forEach(function (file){
    require(sockets_path+'/'+file)(io);
});
// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// Start the app by listening on <port>
var port = process.env.PORT || 80;

server.listen(port, function(){
    console.log('Express listening at port ' + port);
});

//require('./config/socket-io')(app);
