const express = require('express');
const router =express.Router();
const User  = require('../Models/User');
var jwt = require('jsonwebtoken');
const { ObjectId } = require('mongoose');
const ConfPropertyiguration = require('../Models/Property');
const Property = require('../Models/Property');
const Mongoose=require('mongoose');
const Chat = require('../Models/Chat');
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
    let user = await User.findOne({ _id : req.userId  }).limit(1);
    if (user.enabled == 1) {
    try{
        let p = new Property({
            Name : req.body.PropertyName,
            Users: [{"admin" :user._id}]
        });
        p = await p.save();
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.json({status:"ok" , message: 'Property Created',property : p });
        return ;
    }catch (err) {
        res.header("Access-Control-Allow-Headers", "*");
        res.json({ message:err.message });
    }
} else {
    res.json({ status:"err",message:"problem" });
}
});
router.post('/ChangeState',verifyPOSTToken,async (req,res) =>
{
    let user = await User.findOne({ _id : req.userId  }).limit(1);
    if (user.enabled == 1) {
    try{
        let p = await Property.findOne({"_id" : Mongoose.Types.ObjectId(req.body.id) } ).limit(1);
        console.log(p)
        p.state = (p.state === true ) ? p.state = false : p.state = true ;
        console.log(p);
        await p.save();
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.json({status:"ok" , message: 'State Changed',property : p });
        return ;
    }catch (err) {
        res.header("Access-Control-Allow-Headers", "*");
        res.json({ message:err.message });
    }
} else {
    res.json({ status:"err",message:"problem" });
}
});
router.get('/GetAlls',verifyGETToken,async (req,res) =>
{
    let user  = await User.findOne({ _id : req.userId  });
    if (user.enabled) {
    try{
        let property=[];
        let f =await Property.find({"Users.admin" : Mongoose.Types.ObjectId(req.userId) } ).lean().then(p=>{
            //console.log(p)
            

            if(p != {}) {
                
                p.forEach( (element,i) => {
                    
                    if (element.Products !== [] ){
                        let chats=[]
                        element.Products.forEach( async (el,j) => {
                            if (el.hasOwnProperty('chat')) {
    
                                let c = await Chat.findOne({ "Property" : Mongoose.Types.ObjectId(element._id) });
                                chats.push(c);
                            }
                            p[i].Products=[]
                            p[i].Products.push({"chat" : chats});
                            //console.log(JSON.stringify(p));
                        })
                    }
                    
                    
                });

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        console.log("*************************");
        res.json({status:"ok" , propertys : p});

            }
        });  
    }catch (err) {
        res.header("Access-Control-Allow-Headers", "*");
        res.json({ message:err.message });
    }
}
});
router.get('/GetAll',verifyGETToken,async (req,res) =>
{
    let user  = await User.findOne({ _id : req.userId  });
    if (user.enabled) {
    try{
        let property=[];
        let f =await Property.find({"Users.admin" : Mongoose.Types.ObjectId(req.userId) } ).lean()
        
        for(let i=0; i < f.length; i ++) {
            //product
            if (f[i].Products !== [] ){
                let chats=[]
                
                for(let j=0;j< f[i].Products.length;j++){
                    
                    if (f[i].Products[j].hasOwnProperty('chat')) {
                        //console.log(f[i].Products[j].chat)
                        let c = await Chat.findOne({ _id : Mongoose.Types.ObjectId(f[i].Products[j].chat) });
                        if (c) {
                            //console.log(c)
                            let pr = {}
                            pr.Created_date = c.Created_date;
                            pr.state = c.state;
                            pr.chatBot = c.chatBot;
                            pr.Users = c.Users;
                            pr._id = c._id;
                            pr.Name = c.Name;
                            pr.Style = c.Style;
                            pr.Script = c.Script;
                            chats.push(pr);
                            f[i].Products[j].chat = pr; 
                        }
                    }
                    
                }
            }
        }
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        console.log("*************************");
        res.json({status:"ok" , propertys : f});

        
    }catch (err) {
        res.header("Access-Control-Allow-Headers", "*");
        res.json({ message:err.message });
    }
}
});
/*
                    {
                        Created_date: 2023-03-07T22:05:04.129Z,
                        state: true,
                        chatBot: [],
                        messages: [],
                        Users: [ { admin: 63f9fd6ec58ecd3304639e83 } ],
                        _id: 6407b51877ee6e67b47a83d8,
                        Name: 'azeaze',
                        Style: 'files/chatstyle.css',
                        Script: 'chatScript.js',
                        Property: '64039b84dc9a8636105bc86f',
                        __v: 0
                        }*/
module.exports = router;