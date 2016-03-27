var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function (router) {
    router.param('userid', function (req, res, next, id) {
        var query = User.findById(id);
        query.exec(function (err, user) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return next(new Error('can\' find user'));
            }
            req.user = user;
            return next();
        });
    })

    router.route('/notificationarea/:userid')

            .get(function (req, res, next) {
                res.json(req.user.notificationAreas);
            })

            .post(function (req, res, next) {
                var area = req.user.notificationAreas.create(req.body);
                req.user.notificationAreas.push(area);

                req.user.save(function (err, user) {
                    if (err) {
                        return next(err);
                    }

                    res.json(user.notificationAreas);
                });
            });
}


