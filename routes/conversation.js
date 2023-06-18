const express = require('express');
const router =express.Router();
const User  = require('../Models/User');
var jwt = require('jsonwebtoken');
const { ObjectId } = require('mongoose');
const ConfPropertyiguration = require('../Models/Property');
const Property = require('../Models/Property');
const Mongoose=require('mongoose');
const Conversation = require('../Models/Conversations');
Mongoose.set('useFindAndModify', false);
function verifyPOSTToken(req, res, next) {
    let payload;
    if(req.body.token === 'null') {
        return res.status(401).send('Unauthorized request')
    }
    try{ payload = jwt.verify(req.body.token, process.env.token_Key);} 
    catch (e) {
        
        return res.status(400).send(e);
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
router.get('/GetConversations',verifyGETToken,async(req,res)=>{
    if (req.query.ChatBotId) {
    let c = await Conversation.find({ "ParentChatId" : req.query.ChatBotId });
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.json({status:"ok" , message: 'Conversation', Conversation : c });
    } else {
    res.status(400).send('Not found');
    }
    return ;
});
router.post('/CloseConversations',verifyPOSTToken,async(req,res)=>{
    console.log(req.body.ConversationId);
    if (req.body.ConversationId) {
    let c = await Conversation.findOne({_id:req.body.ConversationId})
    c.state = false;
    await c.save();
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.json({status:"ok" , message: 'Conversation closed', Conversation : c });
    } else {
    res.status(404).send('Not found');
    }
    return ;
});
router.post('/OpenConversations',verifyPOSTToken,async(req,res)=>{
    console.log(req.body.ConversationId);
    if (req.body.ConversationId) {
    let c = await Conversation.findOne({_id:req.body.ConversationId})
    c.state = true;
    await c.save();
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.json({status:"ok" , message: 'Conversation Opened', Conversation : c });
    } else {
    res.status(404).send('Not found');
    }
    return ;
});
router.post('/GetConversationsById',verifyPOSTToken,async(req,res)=>{
    console.log(req.body.ConversationId);
    if (req.body.ConversationId) {
    let c = await Conversation.findOne({_id:req.body.ConversationId})
    c.state = true;
    let t = []
    for (let i =0 ; i < c.texts.length ; i++) {
        let x = c.texts[i];
        if(c.texts[i].seen === false) {
            c.texts[i].seen = true;
            x.seenTime= Math.floor(Date.now() / 1000);
        }
        t.push(x) 
    }
    console.log(t);
    const filter = { _id:req.body.ConversationId };
    const update = { texts: t ,state :true};
    await Conversation.findOneAndUpdate(filter, update);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.json({status:"ok" , message: 'Conversation Opened', Conversation : c });
    } else {
    res.status(404).send('Not found');
    }
    return ;
});

module.exports = router;