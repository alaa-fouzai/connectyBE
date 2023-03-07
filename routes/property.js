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
router.get('/GetAll',verifyGETToken,async (req,res) =>
{
    let user  =await User.findOne({ _id : req.userId  });
    if (user.enabled) {
    try{
        let re=[];
        let M =await Property.find({"Users.admin" : Mongoose.Types.ObjectId(req.userId) } );
        let p=M;
        if(p != {}) {

            p.forEach(async (element,i) => {
                if (element.Products !== [] ){
                    element.Products.forEach( async (el,j) => {
                        if (el.hasOwnProperty('chat')) {
    
                            







                            let c = await Chat.find({ "Property" : Mongoose.Types.ObjectId(element._id) });


                            console.log(p[i].Products[j].chat)
                            p[i].Products[j].chat = c[0]
                            console.log(p);
                            console.log(JSON.stringify(p))
                            re.push(p);
                        }
                    })
                }
                else {
                    re.push(p); 
                }
                
            });
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        
        res.json({status:"ok" , propertys : re});
        }
        
        return ;
    }catch (err) {
        res.header("Access-Control-Allow-Headers", "*");
        res.json({ message:err.message });
    }
}
});

module.exports = router;