/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var mongoose = require('mongoose');
var warningType = mongoose.model('WarningType');


module.exports = function (router) {
    
    router.get('/warningtype', function (req, res, next) {
        var query = req.query;
        warningType.find(query, function (err, types) {
            if (err) {
                return next(err);
            }

            res.json(types);
        })
    });

    //other routes..
}
