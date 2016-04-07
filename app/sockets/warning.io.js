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
                }

                if (notificationAreas.length > 0) {
                    WarningController.getWarningsInArea(notificationAreas, sendWarning);
                } else {
                    WarningController.getWarnings(sendWarning);
                }


                WarningController.findRecentWarnings(function (err, warnings) {
                    if (!err) {
                        socket.emit('warning:list', warnings);
                        console.log('warning list send');
                    }
                });

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
                    notificationAreas = data;
                    WarningController.registerObserver(function (newWarning) {
                        var inArea = WarningController.isWarningInAreas(newWarning, notificationAreas);
                        if (inArea) {
                            socket.emit('warning:new', newWarning);
                        }
                    })
                });
            });
}