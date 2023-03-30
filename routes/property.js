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

        let f = await getPropertys(req.userId).then(async (f) => {
            console.log(" step 1");
        })
        property = await getChats(f).then(async (s)=> {
            console.log("step 2")
        });
       console.log("step 3")
        
    }catch (err) {
        res.header("Access-Control-Allow-Headers", "*");
        res.json({ message:err.message });
    }
}
});
 async function getPropertys(id) {
    let f =await Property.find({"Users.admin" : Mongoose.Types.ObjectId(id) } ).lean();
    /* {
            _id: 6407bdd152341d6248dfff37,
            Created_date: 2023-03-07T22:42:14.883Z,
            state: true,
            Users: [ [Object] ],
            Products: [],
            Name: 'tchat',
            __v: 0
        } */
    return new Promise(function(resolve, reject) {
        //console.log(f);
        resolve(f) // successfully fill promise
    })
}
async function getChats(p) {
    let property=[];
    p.forEach((item) => {
        //console.log(item)
        let x ={}
        x._id = item._id;
        x.Created_date = item.Created_date;
        x.state = item.state;
        x.Users = item.Users;
        x.Name = item.Name;
        //console.log(item.Products.length);
        //console.log(typeof(item.Products))
        if ( item.Products.length > 0 ) {
            //console.log("typeof(item.Products)")
            item.Products.forEach(async (p) => {
                if (p.hasOwnProperty('chat')){
                    let c = await getChat(p.chat)
                    x.Products = [];
                    x.Products.push(c);
                }
            })
        }else{
            x.Products = [];
        }
        property.push(x);
    });
    return new Promise(function(resolve, reject) {
        //console.log(f);
        resolve(property) // successfully fill promise
    })
}
async function getChat(p) {
    let c = await Chat.findOne({ _id : Mongoose.Types.ObjectId(p) });
                    console.log(c);
                    let pr = {}
                    
                    pr.Created_date = c.Created_date;
                    pr.state = c.state;
                    pr.chatBot = c.chatBot;
                    pr.Users = c.Users;
                    pr._id = c._id;
                    pr.Name = c.Name;
                    pr.Style = c.Style;
                    pr.Script = c.Script;
    return new Promise(function(resolve, reject) {
        console.log("pr");
        console.log(pr);
        resolve(pr) // successfully fill promise
    })
}
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