var mongoose = require('mongoose');
var ImageSchema = mongoose.Schema({
    img:{
        type:String
    },
    time:{
         type : Date, 
         default: Date.now 
    },
    authorId:{
        type:String
    },
    authorName:{
        type:String
    },
    imgDescription:{
        type:String
    },
    imgTag:{
        type:String,
        default:""
    },
    imageComment :[{
        comment:{
            type:String,
            default:""
        },
        userName:{
            type:String
        }
    }],
    imageLikes:{
        total:{
            type:Number,
            default:0
        },
        userId:[{
            type:String           
        }]
    }
})
module.exports = mongoose.model("ImageData",ImageSchema);