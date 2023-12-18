import mongoose from "mongoose";

const postSchema= new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    location:String,
    description:String,
    userPicturePath:String,
    picturePath:String,
    // we made likes as map instead of array of strings so that whenever we want to check for a particular userId we don't need traverse whole
    // array O(n) just O(1) using map
    likes:{
        type:Map,
        of : Boolean,
    },
    comments:{
        type:Array,
        default : [],
    }

},{timestamps:true});

const Post = new mongoose.model("Post",postSchema);
export default Post;