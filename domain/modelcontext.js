var mongoose = require('mongoose');

module.exports = ModelContext;

function ModelContext(connectionString){
    mongoose.connect(connectionString);
    mongoose.model('Demo', require('../model/demo.js').Demo);
}