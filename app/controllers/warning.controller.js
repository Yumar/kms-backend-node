var mongoose = require('mongoose');
var WarningModel = mongoose.model('Warning');

module.exports = {
    messageObservers: [],
    setRecentHours: setRecentHours,
    registerObserver: registerObserver,
    notifyObservers: notifyObservers,
    verifyWarningArea: isWarningInAreas,
    filterWarningByAreas: filterByArea,
    getWarnings: findRecentWarnings,
    getWarningsInArea: findRecentWarningsInArea,
    /*new areas filering logic*/
    clientAreas: {},
    registerClientAreas: function (clientID, notificationAreas, callback) {
        this.clientAreas[clientID] = {areas: notificationAreas, callback:callback};
        console.log('clients: ',this.clientAreas);
    },
    flushClientAreas: function (clientID) {
        delete this.clientAreas[clientID];
        console.log('client areas after deleting '+clientID,this.clientAreas);
    },
    notifyWarningClients: function (warning) {
        var cliens = this.clientAreas;
        Object.keys(cliens)
                .forEach(function (key) {
                    if (cliens[key].areas.length > 0) {
                        if (isWarningInAreas(warning, cliens[key].areas)) {
                            cliens[key].callback(warning);
                        }
                    }else{
                        cliens[key].callback(warning);
                    }

                })
    }
};

var recentHours = 72;
var generateRecentWarningQuery = function () {
    return WarningModel.find()
            .where('reportDate')
            .gt(Date.now() - 1000 * 60 * 60 * recentHours * 2);
}

function setRecentHours(hours) {
    recentHours = hours;
}

function findRecentWarningsInArea(areas, callback) {
    var areaArr = [];
    var customQuery = generateRecentWarningQuery();

    for (var i = 0; i < areas.length; i++) {
        areaArr.push(areas[i].location.neighborhood);
    }
    customQuery
            .where('location.neighborhood').in(areaArr)
            .exec(callback);
}

function findRecentWarnings(callback) {
    generateRecentWarningQuery().exec(callback);
}

function registerObserver(callback) {
    this.messageObservers.push(callback);
}

function notifyObservers(newmessage) {
    for (var i = 0; i < this.messageObservers.length; i++) {
        this.messageObservers[i](newmessage);
    }
}


function filterByArea(warnings, notificarionAreas, callback) {
    var filtered = warnings.filter(isWarningInAreas(notificarionAreas));
    callback(filtered);
}

function isWarningInAreas(warning, areas, callback) {
    var location = warning.location;
    if ('location' in warning && typeof (location) === 'object') {

        for (var i = 0; i < areas.length; i++) {
            //verify if neighborhood is on user's warning areas
            if (areas[i].location.neighborhood && areas[i].location.neighborhood == location.neighborhood) {
                return true;
            } else {
                console.log(areas[i].location.neighborhood + ' not equals ' + location.neighborhood);
                console.log('--------- area:', areas[i])
            }
        }

    }
}