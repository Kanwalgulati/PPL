var ImageDb = require ('../Schema/ImageSchema');
const mongoose = require('mongoose');
module.exports = {
    addImage : (imgObj) => {
        return new Promise((resolve,reject) =>{
            const obj = {
                img:imgObj.imgName,
                authorId:imgObj.id,
                authorName:imgObj.name,
                imgDescription:imgObj.description,
                imgTag:imgObj.tag
            }
            ImageDb.create(obj,(err,result) =>{
                if(err)
                {
                    reject(err);
                    console.log("Error occured");
                }
                else{
                    resolve(result);
                    console.log(result);
                }
            })
            
        })
    },
    getImage : () => {
        return new Promise((resolve,reject) => {
            ImageDb.find({},(err,result)=>{
                if(err)
                {
                    reject(err)
                }
                else
                {
                    resolve(result)
                    console.log(result)
                }
            })
        })
    },
    getImageData : (id) => {
        console.log("Find this Id : ",id)
        return new Promise((resolve,reject) => {
            ImageDb.find({_id:id},(err,result)=>{
                if(err)
                {
                    reject(err)
                }
                else
                {
                    resolve(result)
                    console.log(result)
                }
            })
        })

    },
    getLikes : (imgId,Likes,userId) =>{
        console.log("Likes : ",Likes)
        return new Promise((resolve,reject)=>{
            ImageDb.findOneAndUpdate({"_id":imgId},{$set:{"imageLikes.total":Likes},$push:{"imageLikes.userId":userId}},(err,data)=> {

                if(err)
                {
                    reject(err)
                    console.log("error Occured")
                }
                else
                {
                    resolve(data)
                    console.log("Likes Updated")
                }
            })
        })
    },
    removeLikes: (imgId,Likes,userId) =>{
        console.log(typeof Likes,"Inside remove Likes")
        return new Promise((resolve,reject)=>{
            ImageDb.findOneAndUpdate({"_id":imgId},{$set:{"imageLikes.total":Likes},$pull:{"imageLikes.userId":userId}},(err,data)=> {
                if(err)
                {
                    reject(err)
                    console.log("error Occured")
                }
                else
                {
                    resolve(data)
                    console.log("Likes Updated")
                }
            })
        })
    },
    postComment:(obj)=>{
        const data = {
            "comment":obj.comment,
            "userName":obj.name
        }
        return new Promise ((resolve,reject)=>{
            console.log(obj.name)
            ImageDb.findOneAndUpdate({"_id":obj.id},{$push:{"imageComment":data}},(err,data)=> {
                if(err)
                {
                    reject(err)
                    console.log("error Occured")
                }
                else
                {
                    resolve(data)
                    console.log("Comment Added")
                }
            })
        })
    }
}