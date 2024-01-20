const mongoose = require('mongoose')

const imgschema = new mongoose.Schema({
    file:String
})

module.exports = mongoose.model('imgfile',imgschema)