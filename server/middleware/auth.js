import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const auth=async (req,res,next)=>{
    try{
    
    let token = req.header("Authorization");
    if(!token)
    return res.status(403).send("Access Denied");

    token=token.replace('Bearer ','');

    const decoded = jwt.verify(token,process.env.SECRET_KEY);
    const user = await User.findOne({_id:decoded.id});
    if(!user)
    return res.status(400).json({msg:'Token expired'});

    req.user=user;
    req.token=token;
    next();
    // let token = req.header("Authorization");
    // if(!token)
    // return res.status(403).send("Access Denied");

    // if(token.startsWith("Bearer ")){
    //     token=token.slice(7, token.length).trimLeft();
    // }
    // const decoded = jwt.verify(token,process.env.SECRET_KEY);
    // req.user=decoded;
    // next();
    }
    catch(err){
        res.status(500).json({error:err.message});
    }



}