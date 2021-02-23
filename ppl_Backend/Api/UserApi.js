var UserDb = require('../Schema/UserSchema');
var Keys = require ('../Config/keys')
const nodemailer = require('nodemailer')
const mongoose = require('mongoose');
module.exports = {
    checkUserAuth:function(UserEmail,UserPassword){
        return new Promise((resolve,reject)=>{
            UserDb.find({$and:[{email:UserEmail},{password:UserPassword}]},(err,result)=>{
                if(err)
                {
                    reject(err);
                    console.log("Error Occured");
                }
                else
                {
                    resolve(result);
                    console.log("User Authentication Check");
                }
            })
        })
    },
    checkUser:function(UserEmail){
        return new Promise((resolve,reject) =>{
            UserDb.find({email:UserEmail},(err,result)=>{
                if(err)
                {
                    console.log("Error Occured");
                    reject(err);
                }
                else
                {
                    console.log("User Found");
                    resolve(result);
                }
            })
        })
    },
    addUser: function(data){
        return new Promise((resolve,reject) =>{
            UserDb.create(data,(err,result) =>{
                if(err)
                {
                    console.log("Error Occured");
                    reject(err);
                }
                else
                {
                    console.log("Data inserted");
                    resolve(result);
                }
            })
            
        }) 
    },
    validateUser : function(UserEmail){
        return new Promise((resolve,reject)=>{
            UserDb.find({email:UserEmail},(err,result)=>{
                if(err)
                {
                    reject(err);
                    console.log("Error Occured");
                }
                else
                {
                    resolve(result);
                    console.log(result);
                }
            })
        })
    },
    resetPassword : function(userEmail,userPassword){
        return new Promise((resolve,reject)=>{
            UserDb.update({email:userEmail},{$set:{"password":userPassword}},(err,result)=>{
                if(err)
                {
                    console.log("Error Occured");
                    reject(err)
                }
                else
                {
                    console.log("Password Updateddd")
                    resolve(result)
                }
            })
        })
    },
    sendMail : function (id,otp){
        let mailTransporter = nodemailer.createTransport({
            service:'Gmail',
            auth : {
                user : Keys.mailConfig.mail,
                pass : Keys.mailConfig.pass
            }
        });
        let mailDetails = {
            from : Keys.mailConfig.mail,
            to : id,
            subject : 'Reset Password',
            text : 'Your OTP is '+otp
        };
        mailTransporter.sendMail(mailDetails,(err,data)=>{
            if(err)
            {
                console.log("Error Occured")
            }
            else
            {
                console.log("mail Sent")
            }
        })
    }
}