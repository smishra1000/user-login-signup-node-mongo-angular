var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {type: String, required: true},
    mobile:{type: String,required:true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    age: {type: Number, required: true},
});

// Exporting  the model
module.exports = mongoose.model('User', UserSchema);