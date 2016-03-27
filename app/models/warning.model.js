var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WarningSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    active: {
        type: Boolean,
        default: true
    },
    description: String,
    type: {
        type: Schema.Types.Object,
        ref: 'WarningType',
        required: true
    },
    reportDate: {type: Date, default: Date.now},
    upVotes: [{
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        }],
    downVotes: [{
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        }],
    attachments: [{
            type: String,
            url: String
        }],
    location: {
        latitude: Number,
        longitude: Number,
        street: String,
        neighborhood: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        number: String
    }
});

module.exports = mongoose.model('Warning', WarningSchema);