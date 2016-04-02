module.exports = {
    messageObservers: [],
    registerObserver: registerObserver,
    notifyObservers: notifyObservers,
    verifyWarningArea: isWarningInAreas,
    filterWarningByAreas: filterByArea
};

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

function isWarningInAreas(warning, areas) {
    var location = warning.location,
            onArea = false;

    if ('location' in obj && typeof (location) === 'object') {

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
    
    return onArea;
}