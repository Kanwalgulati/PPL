var Express = require('express');
var app = Express();
var Router = require('./Router/router');
var cors = require('cors');
var mongoose = require('mongoose');
var Keys = require('./Config/keys');
var nodemailer = require('nodemailer');
mongoose.connect(Keys.database.mongo,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Connected to Database")
}).catch(()=>{
    console.log("Data Base not connected");
})
app.use(cors());
app.use("/",Router);
app.use(Express.static('img'))

app.listen(Keys.address.port,()=>{
    console.log("Server is Running");
})