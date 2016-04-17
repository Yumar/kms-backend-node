var mongoose = require('mongoose');
var WarningModel = mongoose.model('Warning');
var WarningController = require('../controllers/warning.controller');

module.exports = function (io) {
    var warningIO = io
            .of('/warning')
            .on('connection', function (socket) {
                var notificationAreas = [];
                var sendWarning = function (err, warnings) {
                    if (!err) {
                        socket.emit('warning:list', warnings);
                        console.log('warning list send');
                    } else {
                        console.log(err);
                        socket.emit('warning:error', err);
                    }
                };

                var init = function () {
                    console.log("initializing list");
                    if (notificationAreas.length > 0) {
                        console.log("customizing list");
                        WarningController.getWarningsInArea(notificationAreas, sendWarning);
                    } else {
                        console.log("sending warnings no filtered");
                        WarningController.getWarnings(sendWarning);
                    }
                };

                init();

                socket.on('warning:create', function (data) {
                    var newwarning = new WarningModel(data);
                    newwarning.save(function (err) {
                        if (!err) {
                            console.log('emited new warning');
                            WarningController.notifyObservers(newwarning);
                        } else {
                            console.log(err);
                            socket.emit('warning:error', err);
                        }
                    });
                });

                socket.on('warning:customizeAreas', function (data) {
                    console.log('customizing for ' + data.length + ' areas');
                    notificationAreas = data;
                    init();
                    WarningController.registerObserver(function (newWarning) {
                        WarningController.verifyWarningArea(newWarning, notificationAreas, function () {
                            console.log('user found in warning area');
                            socket.emit('warning:new', newWarning);
                        });
                    });
                });
            });
};