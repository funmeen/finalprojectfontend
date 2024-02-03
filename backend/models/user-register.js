const mongoose = require('mongoose');

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true, 
    },
    role: {
        type: String,
        default: 'user'
    }
}, {timestamps: true})

const postSchema = new Schema({
    header: {
        type: String,
        required: true,
        //unique: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    }
}, { timestamps: true });


//model
const UserModel = mongoose.model('User', userSchema);
const PostModel = mongoose.model('Post', postSchema);

module.exports = { UserModel, PostModel };
