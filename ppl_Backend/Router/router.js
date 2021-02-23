var Express = require('express');
var bodyParser = require('body-parser');
var Router = Express.Router();
const multer = require('multer');
var path = require('path')
var storage = multer.diskStorage(
    {
        destination: './img',
        filename: function ( req, file, cb ) {
            cb( null,file.originalname);
        }
    }
);

var upload = multer( { storage: storage } );
var uploadd = multer({
    dest:'./images'
})
Router.use(bodyParser.urlencoded({ extended: false }))
Router.use(bodyParser.json())
const userApi = require('../Api/UserApi');
const ImageApi = require('../Api/ImageApi');
const { response } = require('express');
const UserApi = require('../Api/UserApi');
Router.post('/upload',upload.single('imgData'),async (req,res) =>{
    console.log("in upload Page : ",req.body.tag)
    let imgObj = {
        imgName:req.file.originalname,
        id:req.body.id,
        name:req.body.name,
        description:req.body.description,
        tag:req.body.tag
    }
    const insertImage = await ImageApi.addImage(imgObj)
    res.send("1");
})
Router.post('/login',async (req,res)=>{
    const checkAuth = await userApi.checkUserAuth(req.body.email,req.body.password)
    if(checkAuth.length==1)
    {

        // res.cookie('OurCookie',req.body.email);
        res.send(checkAuth[0]);
    }
    else
    {
        res.send("0")
    }
    res.end();
})
Router.post('/getSpecificImage',async(req,res)=>{
    const getImages = await ImageApi.getImageData(req.body.id);
    console.log("image Id ",req.body.id);
    res.send(getImages)
})
Router.post('/register',async(req,res)=>{
    console.log(req.body);
    const UserAlreadyPresent =  await userApi.checkUser(req.body.email);
    console.log("User : ",UserAlreadyPresent.length);
    if(UserAlreadyPresent.length==0)
    {
        const InsertUser = await userApi.addUser(req.body);
        console.log("Insert User "+InsertUser);
        res.send("1");
    }
    else
    {
        res.send("0");
    }
    res.end();  
})
Router.get('/getAllImage',async (req,res)=>{
    const getImages = await ImageApi.getImage() 
    res.send(getImages)
})
Router.post('/postLikes',async (req,res) =>{
    let imgId = req.body.imgid
    let Likes = req.body.updatedLikeValue
    let userId = req.body.userId
    const getLikes = await ImageApi.getLikes(imgId,Likes,userId)
    // const getUserStatus = await UserApi.setLike()
    res.send(getLikes)
})
Router.post('/removeLike',async (req,res) =>{
    let imgId = req.body.imgid
    let Likes = req.body.updatedLikeValue
    let userId = req.body.userId
    const removeLikes = await ImageApi.removeLikes(imgId,Likes,userId)
    res.send(removeLikes)
    
})
Router.post('/postLikes',async (req,res) =>{
    let imgId = req.body.imgid
    let Likes = req.body.updatedLikeValue
    let userId = req.body.userId
    const getLikes = await ImageApi.getLikes(imgId,Likes,userId)
    // const getUserStatus = await UserApi.setLike()
    res.send(getLikes)
})
Router.post('/postComment',async (req,res) =>{
    let obj = {
        id:req.body.id,
        name:req.body.userName,
        comment:req.body.comment
    }
    const postComment = await ImageApi.postComment(obj)
    console.log("Comment BackEnd : ",req.body)
    res.send(postComment)
})
Router.post('/resetValidateUser',async (req,res)=>{
    console.log("User Body : ",req.body)
    const checkAuth = await UserApi.validateUser(req.body.email)
    console.log("User Data ")
    res.send(checkAuth)
})
Router.post('/nodemailer',async (req,res) =>{
    console.log("Mail Data ::: ",req.body)
    const getMail = UserApi.sendMail(req.body.email,req.body.generatedOTP)
    
})
Router.post('/resetPassword',async (req,res) =>{
    // console.log("user : ",req.body);
    const resetPasswordSuccessful = await UserApi.resetPassword(req.body.email,req.body.password)
    console.log(resetPasswordSuccessful)
    res.send(resetPasswordSuccessful)
})
module.exports = Router;