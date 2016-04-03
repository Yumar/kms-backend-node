var mongoose = require('mongoose');
var WarningModel = mongoose.model('Warning');

module.exports = function (io) {
    var warningIO = io
            .of('/warning')
            .on('connection', function (socket) {
                console.log('connected');

                WarningModel.find(function (err, warnings) {
                    if (!err) {
//                        console.log(warnings);
                        socket.emit('warning:list', warnings);
                        console.log('warning list send');
                    }
                });

                socket.on('warning:create', function (data) {
                    var newwarning = new WarningModel(data);
//                    console.log('new warning recieved', data);
                    newwarning.save(function (err) {
                        if (!err) {
                            console.log('emited new warning');
                            warningIO.emit('warning:new', newwarning);
                        }else{
                            console.log(err);
                        }
                    });
                });
            });
}
