const { ObjectId } = require('mongoose');
const mongoose=require('mongoose');

const ChatSchema = mongoose.Schema(
    {
        _id: ObjectId,
        Name: {
            type : String,
            required : true
        },
        Created_date: {
            type : Date,
            default : Date.now()
        },
        Style: {
            type : String,
            required : true
        },
        Script:{
            type : String,
            required : true
        }
        ,
        chatBot: [String]
        ,
        messages: [String]
        ,
        Users: [String]
        ,
    }
);

module.exports=mongoose.model('Chat',ChatSchema);
