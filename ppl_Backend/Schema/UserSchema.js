var mongoose = require('mongoose');
var UserSchema = mongoose.Schema({
    username:{
        type:String
    },
    password:{
        type:String
    },
    email:{
        type:String
    },
    fname:{
        type:String
    },
    lname:{
        type:String
    }
    
})
module.exports = mongoose.model("UserDetails",UserSchema);