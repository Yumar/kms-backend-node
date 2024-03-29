/* 
 * This allows cross origin domain requests
 */

module.exports = function (router) {
    router.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Access-Token, X-Key");
        next();
    });
}

