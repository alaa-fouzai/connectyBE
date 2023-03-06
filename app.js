const express = require('express');
require('dotenv/config');
const app = express();
var jwt = require('jsonwebtoken');
const mongoose=require('mongoose');
const socket = require('socket.io');
var cors = require('cors')
mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true , useUnifiedTopology: true } ,() => console.log('connected to BD')).catch(error => handleError(error));
const bodyParser= require('body-parser');



app.use(cors());
app.use(bodyParser.json());
const server = app.listen(3000,'0.0.0.0');
global.io = socket.listen(server);
module.exports = io;
const UserRouter = require('./routes/Users');
const DashboardRouter = require('./routes/dashboard');
const PropertyRouter = require('./routes/property');
const ChatRouter = require('./routes/Chat');



app.use('/api/users',UserRouter);
app.use('/api/dashboard',DashboardRouter);
app.use('/api/property',PropertyRouter);
app.use('/api/chat',ChatRouter);


app.get('/',(req,res)=>{
    res.send('hello world');
});

const news = io
    .of('/news')
    .on('connection', (socket) => {
        console.log('news connected', socket.id);
        socket.emit('item', { news: 'item' });
    });


