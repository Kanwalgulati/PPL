let address="http://localhost:7000/"
module.exports = {
    axiosCall:{
        upload :address+'upload',
        login : address+'login',
        register : address+'register',
        getAllImages : address+'getAllImage',
        getspecificImage:address+'getSpecificImage',
        address:address,
        postLikes:address+'postLikes',
        removeLike:address+'removeLike',
        postComment:address+'postComment',
        resetValidateUser:address+'resetValidateUser',
        resetPassword:address+'resetPassword',
        nodemailer:address+'nodemailer'
    }
}