var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function (router) {
    
    //login route
    router.post('/login', function(req, res, next){
        var login = req.body;
        
        User.findOne({'email':login.email}, function (err, user) {
            if (err) {
                return next(err);
            }
            
            if(user){
                user.comparePassword(login.password, function(error, isMatch){
                    if(isMatch){
                        user.password = null;
                        res.json(user);
                    }
                });
            }else{
                res.status(403).send('User not found');
            }
        })
        
    })
    
}


