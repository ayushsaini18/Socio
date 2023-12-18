import Post from "../models/Post.js"
import User from "../models/User.js";

export const createPost=async(req,res)=>{
try{
    const{description,picturePath}=req.body;
    const user= req.user;
    
    const newPost= new Post({
        userId:user._id,
        firstName:user.firstName,
        lastName:user.lastName,
        location:user.location,
        description,
        picturePath,
        userPicturePath:user.picturePath,
        likes:{},
        
    });
    await newPost.save();
    
    // will return the updated posts
    const posts = await Post.find();
    res.status(201).json(posts);
}
catch(err){
    res.status(409).json({error:err.message});
}
    };
export const updateLikes=async(req,res)=>{
    try{
        const id=req.params.id;
        const post = await Post.findById(id);
        const userId=req.user._id;
        
        // if(post.likes.userId===undefined)
        // post.likes.userId=true;
        // else
        // delete post.likes.userId;
        if(post.likes.get(userId))
        post.likes.delete(userId);
        else
        post.likes.set(userId,true);
        
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
          );
        res.status(200).json(updatedPost);
    // he used findById and Update here with giving updated likes as 2nd object
        // await post.save();
        // res.status(200).json(post);
    } 
    catch(err){
        res.status(404).json(err);
    }
    };
export const getFeedPosts=async(req,res)=>{
    try{
    const posts=await Post.find();
    res.status(200).json(posts);
    
    }
    catch(err){
        res.status(404).json({error:err.message});
    }
    };
export const getUserPosts=async(req,res)=>{
    try{
        const userId=req.params.userId;
        const posts=await Post.find({userId});
        res.status(200).json(posts);
    }
    catch(err){
        res.status(404).json({error:err.message});
    }
    };