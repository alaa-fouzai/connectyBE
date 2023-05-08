const express = require('express');
const router =express.Router();
const User  = require('../Models/User');
var jwt = require('jsonwebtoken');
const Configuration = require('../Models/Configuration');
const Chat = require('../Models/Chat');
const Property = require('../Models/Property');
const Mongoose=require('mongoose');
function verifyPOSTToken(req, res, next) {
    let payload;
    if(req.body.token === 'null') {
        return res.status(401).send('Unauthorized request')
    }
    try{ payload = jwt.verify(req.body.token, process.env.token_Key);} 
    catch (e) {
        
        return res.status(400).send('Invalid User');
    }
    if(!payload) {
        return res.status(401).send('Unauthorized request');
    }

    decoded=jwt.decode(req.body.token, {complete: true});
    /*
    {
  email: 'admin@admin.com',
  id: '63f9fd6ec58ecd3304639e83',
  iat: 1677956185
}*/
    req.userId = decoded.payload.id;

    next()
}
function verifyGETToken(req, res, next) {
    let payload;
    if(req.body.token === 'null') {
        return res.status(401).send('Unauthorized request')
    }
    try{ payload = jwt.verify(req.query.token, process.env.token_Key);} 
    catch (e) {
        return res.status(400).send('Invalid User');
    }
    if(!payload) {
        return res.status(401).send('Unauthorized request');
    }

    decoded=jwt.decode(req.query.token, {complete: true});
    /*
    {
  email: 'admin@admin.com',
  id: '63f9fd6ec58ecd3304639e83',
  iat: 1677956185
}*/
    req.userId = decoded.payload.id;

    next()
}
router.post('/AddNew',verifyPOSTToken,async (req,res) =>
{
    try{
        let user = await User.findOne({ _id : req.userId  }).limit(1);
        console.log(req.userId);
        let chat = new Chat({
        Name:req.body.chatBotName,
        Style: "files/chatstyle.css",
        Script:"chatScript.js",
        Property:req.body.propertyId
        });
        chat.Users.push( {"admin" :user._id} )
        chat = await chat.save();
        console.log(chat);
        let p = await Property.findOne({"_id" : Mongoose.Types.ObjectId(req.body.propertyId) } ).limit(1);
        p.Products.push( {"chat":chat._id} );
        p = await p.save();
        console.log(p)
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.json({status:"ok" , message: 'Chat Added'});
        return ;
    }catch (err) {
        res.header("Access-Control-Allow-Headers", "*");
        console.log(err);
        res.json({ message:err.message });
    }

});
router.get('/getChat',verifyGETToken,async(req,res)=>{
    console.log(req.userId);
    let user = await User.findOne({ _id : req.userId  }).limit(1);
    let p = await Property.find({"Users.admin" : Mongoose.Types.ObjectId(req.userId) } );
    let c = await Chat.find({ "Users.admin" : Mongoose.Types.ObjectId(req.userId) });
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.json({status:"ok" , message: 'chat',user : user,Property : p , Chat : c });
    return ;
});
router.get('/getSingleChat',verifyGETToken,async(req,res)=>{
    console.log(req.userId);
    console.log(req.ChatBotId);
    let user = await User.findOne({ _id : req.userId  }).limit(1);
    let c = await Chat.find({ "Users.admin" : Mongoose.Types.ObjectId(req.userId),"_id" :Mongoose.Types.ObjectId(req.query.ChatBotId) });
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.json({status:"ok" , message: 'chat',user : user , Chat : c[0] });
    return ;
});
router.post('/ChangeState',verifyPOSTToken,async (req,res) =>
{
    let user = await User.findOne({ _id : req.userId  }).limit(1);
    if (user.enabled == 1) {
    try{
        let c = await Chat.findOne({"_id" : Mongoose.Types.ObjectId(req.body.id) } ).limit(1);
        console.log(c)
        c.state = (c.state === true ) ? c.state = false : c.state = true ;
        console.log(c);
        await c.save();
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.json({status:"ok" , message: 'State Changed',chat : c });
        return ;
    }catch (err) {
        res.header("Access-Control-Allow-Headers", "*");
        res.json({ message:err.message });
    }
} else {
    res.json({ status:"err",message:"problem" });
}
});




module.exports = router;