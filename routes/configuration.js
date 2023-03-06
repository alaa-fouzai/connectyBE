const express = require('express');
const router =express.Router();
const User  = require('../Models/User');
var jwt = require('jsonwebtoken');
const Configuration = require('../Models/Configuration');

function verifyToken(req, res, next) {
    let payload;

    if(req.query.token === 'null') {
        return res.status(401).send('Unauthorized request')
    }
    try{payload = jwt.verify(req.query.token, process.env.token_Key);} catch (e) {
        return res.status(400).send('Invalid User');
    }
    if(!payload) {
        return res.status(401).send('Unauthorized request');
    }

    decoded=jwt.decode(req.query.token, {complete: true});
    req.userId = decoded.payload.id;

    next()
}
router.post('/SetConfiguration',verifyToken,async (req,res) =>
{
    console.log(req.body.userId);
    const User =await User.find({ email : req.body.email  }).limit(1);
    let user=new Configuration({
        FirstName : req.body.FirstName,
        LastName :req.body.LastName,
    });
    try{
        const NewUser =await User.find({ email : req.body.email });
        if (NewUser === undefined || NewUser.length == 0 )
        {
            //add not allow duplicate
            user = await user.save();
            token = CreateJWT(user.email);
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.json({status:"ok" , message: 'Account Create ! You can now Login',token : token });
            return ;
        }

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.json({status:"err" , message: 'Email Already Exists'});
    }catch (err) {
        res.header("Access-Control-Allow-Headers", "*");
        res.json({ message:err.message });
    }

});

module.exports = router;