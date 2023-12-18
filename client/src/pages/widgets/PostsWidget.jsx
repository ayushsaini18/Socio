/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from 'state';
import PostWidget from './PostWidget';

const PostsWidget = ({userId=null}) => {
    const dispatch=useDispatch();
    const posts=useSelector(state=>state.posts);
    const token=useSelector(state=>state.token);

    const getPosts=async()=>{
        try{
        const response=await fetch("https://sociogram-0h3b.onrender.com/posts",{
            method:"GET",
            headers:{
                'Authorization':`Bearer ${token}`
            }
        });
        
         const data=await response.json();
         
        dispatch(setPosts({posts:data}));
        
    }
    catch(err){
        alert(err.message);
    }
        
    }
    
    const getUserPosts=async()=>{
        try{
            const response=await fetch(`https://sociogram-0h3b.onrender.com/posts/${userId}`,{
                method:"GET",
                headers:{
                    'Authorization':`Bearer ${token}`,
                }
            });
    
            const data=await response.json();
            dispatch(setPosts({posts:data}));
            
        }
        catch(err){
          
            alert(err.message);
        }
        
    }

    useEffect(()=>{
        if(userId)
        getUserPosts();
        else
        getPosts();
    },[])

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget