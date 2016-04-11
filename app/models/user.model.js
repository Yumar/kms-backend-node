var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var SALT_WORK_FACTOR = 10;

var RankSchema = Schema({
    title: String,
    level: Number
});

var NotificationAreaSchema = Schema({
    title: {
        type: String
    },
    location: {
        neighborhood: String,
        city: String,
        state: String,
        country: String
    }
});

var UserSchema = Schema({
    active: {
        type: Boolean,
        default: true
    },
    location: {
        latitude: String,
        longitude: String,
        street: String,
        neighborhood: String,
        city: String,
        state: String,
        country: String
    },
    birthdate: {
        type: Date,
        required: true
    },
    profilePictureUrl: {
        type: String,
        default: 'profile'
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: String,
    genre: String,
    phone: {
        type: String,
        required: true
    },
    rank: {
        type: RankSchema,
        default: {title: 'Principiante', level: 1}
    },
    notificationAreas: [NotificationAreaSchema],
    email: {
        type: String,
        required: true,
        index: {unique: true}
    },
    password: {
        type: String,
        required: true
    }
});
//password encryptation        
UserSchema.pre('save', function (next) {
    var user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password'))
        return next();
    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err)
            return next(err);
        // hash the password using our new salt
        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err)
                return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});
UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err)
            return cb(err);
        cb(null, isMatch);
    });
};
module.exports = mongoose.model('User', UserSchema);



