//this folder contains the controller functions to control the actions for various userRoutes
import User from '../models/User.js';

export const updatefriends = async(req,res)=>{
    try {
        const { id, freindId } = req.params;
        const freind = await User.findById(freindId);
        const user = await User.findById(id);
        console.log(user,"freind :"+freind);

        if (user.friends.includes(freindId)) {
          user.friends = user.friends.filter((id) => id !== freindId);
         if(freind) freind.friends = freind.friends.filter((id) => id !== id);
        } else {
          user.friends.push(freindId);
          if(freind) freind.friends.push(id);
        }

        console.log("saved");
        await user.save();
        await freind.save();
    
        const friends = await Promise.all(
          user.friends.map((id) => User.findById(id))
        );
        const friends2 = await Promise.all(
          freind.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
          ({ _id, firstName, lastName, occupation, location, picturePath }) => {
            return { _id, firstName, lastName, occupation, location, picturePath };
          }
        );
        const formattedFriends2 = friends2.map(
          ({ _id, firstName, lastName, occupation, location, picturePath }) => {
            return { _id, firstName, lastName, occupation, location, picturePath };
          }
        );
          console.log(formattedFriends.length,formattedFriends2.length);
        res.status(200).json({formattedFriends,formattedFriends2});
      } catch (err) {
        res.status(404).json({ message: err.message });
      }
    };
export const getUser = async(req,res)=>{
    try{
        const id=req.params.id;
        const user=await User.findById(id);
        res.status(200).json(user);
    }
    catch(err){
    res.status(404).json({message:err.message});
    }
};
export const getfriends = async(req,res)=>{
    try{
        const id=req.params.id;
        const user=await User.findById(id);
        
   
        // const friends = user.friends.map(async(id) => {
        //     const freind= await User.findById(id);
        //     return freind;
        // });
    
// In the code you provided, you are using async/await inside the .map() callback function to fetch friend profiles using User.findById(id). 
// However, this approach returns an array of promises instead of the actual friend objects.

// To handle the array of promises and await their resolution, you can use Promise.all() to wait for all the promises to resolve 
// and return the resolved values. Here's an updated version of the code:


const friends = await Promise.all(
    user.friends.map(id =>User.findById(id))
);

// we only included those properties in the returning friends 
// which we want(no email passwords etc)

const formattedfriends=friends.map(
    ({_id,firstName,lastName,occupation,location,picturePath})=>{
    return {_id,firstName,lastName,location,occupation,picturePath};
    }
    );
    
res.status(200).json(formattedfriends);

    }
catch(err){
    res.status(404).json({message:err.message});
}
}; 