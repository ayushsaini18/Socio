import { ChatBubbleOutlineOutlined, FavoriteBorderOutlined, FavoriteOutlined, ShareOutlined } from "@mui/icons-material"
import {  Box, Divider, IconButton,  Typography, useTheme } from "@mui/material"
import FlexBetween from "components/FlexBetween"
import Friend from "components/Friend"
import WidgetWrapper from "components/WidgetWrapper"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPost } from "state"

const PostWidget = (  {
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,}
    ) => { 
        
 
      const { palette } = useTheme();
      const main = palette.neutral.main;
      const primary = palette.primary.main;
    
  
  const user=useSelector(state=>state.user);
  const token=useSelector(state=>state.token);

  const dispatch=useDispatch();

  
  const isLiked= likes[user._id]===true ;
  const [isCommentClicked,setIsCommentClicked]=useState(false);

  const patchLike=async()=>{
    try{
      
    const response = await fetch(`https://sociogram-0h3b.onrender.com/posts/${postId}/like`,{
        method:"PATCH",
        headers:{
            Authorization:`Bearer ${token}`,
        }
    });
    
    const post=await response.json(); //this route returns same post by updating its likes map so we update the redux state's posts field too
    
    dispatch(setPost({post}));
    
  }catch(err){
     
    alert(err.message);
  }
  }

  return (
    <WidgetWrapper m="2rem 0">
       <Friend 
       freindId={postUserId}
       name={name}
       subtitle ={ location} 
       freindImage={userPicturePath} 
       />

        <Typography color={main} sx={{mt:"1rem"}}>
            {description}
        </Typography>

      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`https://sociogram-0h3b.onrender.com/assets/${picturePath}`}
        />
      )}

      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
        
        <FlexBetween gap="0.3rem">
    <IconButton onClick={patchLike}>
        { isLiked
         ? <FavoriteOutlined sx={{color:primary}}/>
        : <FavoriteBorderOutlined/> }
    </IconButton>
        <Typography>
            {Object.keys(likes).length}
        </Typography>

        </FlexBetween>
        
        <FlexBetween gap="0.3rem">
        <IconButton onClick={()=>setIsCommentClicked(!isCommentClicked)}>
            <ChatBubbleOutlineOutlined/>
        </IconButton>
        <Typography>
            {comments.length}
        </Typography>
        </FlexBetween>

        </FlexBetween>
        
        <ShareOutlined/>
      </FlexBetween>

      { isCommentClicked && 
      <Box mt="0.5rem">
       { comments.map( (comment,i) =>  (
          <Box key={`${name}-${i}`}>
            <Divider/>
          <Typography sx={{color:main,m:"0.5rem 0" ,pl:"1rem"}}>
            {comment}
          </Typography>
          </Box>
          ))
          }
        <Divider/>
      </Box>
      }

    </WidgetWrapper> 
  )
}

export default PostWidget
