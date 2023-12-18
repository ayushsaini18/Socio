import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

/*REGISTERING USER*/
export const register=async(req,res)=>{
    try{
        const {password} = req.body;
        const salt=await bcrypt.genSalt();
        const passwordHash=await bcrypt.hash(password,salt);
        const user = new User({
            ...req.body,
            password:passwordHash,
            viewedProfile:Math.floor(Math.random()*10000),
            impressions:Math.floor(Math.random()*10000)
        });
        await user.save();
        res.status(201).json(user); 
    }
    catch(err){
        res.status(500).json({error:err.message});
    }

}

 /*LOGGING USER IN */
export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) return res.status(400).json({ msg: "User does not exist. " });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });
  
      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
      delete user.password;
      res.status(200).json({ token, user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

// export const login=async(req,res)=>{
//     try{
//         const {email,password} = req.body;
        
//         const user = await User.findOne({email});
//         if(!user)
//         return res.status(400).json({msg:"User doesn't exists"});
        
//         bcrypt.compare(user.password,password,(err,result)=>{
//             if(!result)
//             return res.status(400).json({msg:"Invalid credentials"});
//         });

//         const payload={id:user._id};
//         const secretKey=process.env.SECRET_KEY;
//         // const options={expiresIn:'1h'};
        
//         const token = jwt.sign(payload,secretKey);
//         delete user.password;

//         res.status(200).json({token,user}); 
//     }
//     catch(err){
//         res.status(500).json({error:err.message});
//     }
// }