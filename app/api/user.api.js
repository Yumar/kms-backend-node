var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function (router) {
    router.route('/user/:id')
            .get(function (req, res) {
                var id = req.params.id;
                var query = User.findById(id);
                query.exec(function (err, user) {
                    if (err) {
                        res.status(500).send('server error');
                    }
                    if (!user) {
                        res.status(404).send('user not found');
                    }
                    user.password = null;
                    res.json(user);
                });
            })

    //login route
    router.post('/login', function (req, res, next) {
        var login = req.body;
        console.log(login);

        User.findOne({'email': login.username}, function (err, user) {
            if (err) {
                return next(err);
            }

            if (user) {
                user.comparePassword(login.password, function (error, isMatch) {
                    if (isMatch) {
                        user.password = null;
                        res.json(user);
                    } else {
                        res.status(403).send('Password incorrect');
                    }
                });
            } else {
                res.status(403).send('User not found');
            }
        })

    })

    //register user
    router.route('/user')
            .post(function (req, res, next) {
                console.log("reviced from client", req.body);
                var user = new User(req.body.form);

                if (!user.notificationAreas) {
                    user.notificationAreas = [];
                }
                var homeArea = {title: 'home', location: user.location};
                user.notificationAreas.push(homeArea);


                user.save(function (err, userResult) {
                    if (err) {
                        console.log(err);
                        res.status(400).send(err);
                    }

                    res.json(userResult);
                })
            })
            .patch(function (req, res, next) {

            })

    router.delete('/login', function (req, res, next) {
        res.status(200).send("Session ended");
    })

}

