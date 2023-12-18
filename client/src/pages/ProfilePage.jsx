
import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "./NavBar";
import FriendsList from "./widgets/FriendsList";
import PostsWidget from "./widgets/PostsWidget";
import UserWidget from "./widgets/UserWidget";
import { setCurrentfriends } from "state";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();

  const token = useSelector((state) => state.token);
  const {_id,friends}=useSelector(state=>state.user);
  const currentfriends=useSelector(state=>state.currentfriends);

  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const dispatch=useDispatch();

  const getUser = async () => {
    const response = await fetch(`https://sociogram-0h3b.onrender.com/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };
  const getfriends=async()=>{
    const response=await fetch(`https://sociogram-0h3b.onrender.com/users/${userId}/friends`,{
        method:"GET",
        headers:{
            Authorization:`Bearer ${token}`,
        }
    });
     
     const friends=await response.json();
    dispatch(setCurrentfriends({friends}));
  }
    
 
  useEffect(() => {
    getUser();
    getfriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  user.friends= ((userId!==_id) ? currentfriends:friends);
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget user={user}  />
          <Box m="2rem 0" />
          <FriendsList friends={user.friends} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <Box m="2rem 0" />
          <PostsWidget userId={userId}   />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
 

  