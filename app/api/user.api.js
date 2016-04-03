var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function (router) {
    
    //login route
    router.post('/login', function(req, res, next){
        var login = req.body;
        console.log(login);
        
        User.findOne({'email':login.username}, function (err, user) {
            if (err) {
                return next(err);
            }
            
            if(user){
                user.comparePassword(login.password, function(error, isMatch){
                    if(isMatch){
                        user.password = null;
                        res.json(user);
                    } else{
                       res.status(403).send('Password incorrect'); 
                    }
                });
            }else{
                res.status(403).send('User not found');
            }
        })
        
    })
    
    router.delete('/login', function(req, res, next){
        res.status(200).send("Session ended");
    })
    
}

