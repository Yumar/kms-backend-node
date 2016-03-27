var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function (router) {
    
    //login route
    router.post('/login', function(req, res, next){
        
        User.find(function (err, users) {
            if (err) {
                return next(err);
            }
            
            var firstuser = users[0];
            res.json(firstuser);
        })
        
    })
    
}


