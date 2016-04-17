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
    getWarningsInArea: findRecentWarningsInArea
};

var recentHours = 72;
var generateRecentWarningQuery = function(){
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
    console.log(areaArr);
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
    var location = warning.location,
            onArea = false;

    if ('location' in warning && typeof (location) === 'object') {

        for (var i = 0; i < areas.length; i++) {
            //verify if neighborhood is on user's warning areas
            if (areas[i].neighborhood && areas[i].neighborhood === location.neighborhood)
                return true;

            //verify if city is on user's warning areas
            if (areas[i].city && areas[i].city === location.city)
                return true;

            //verify if city is on user's warning areas
            if (areas[i].country && areas[i].country === location.country)
                return true;
        }

    }
    
    //call callback
    callback(onArea);

    return onArea;
}