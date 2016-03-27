var mongoose = require('mongoose');

var WarningTypeSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    label: String,
    priority: Number
});

module.exports = mongoose.model('WarningType', WarningTypeSchema);