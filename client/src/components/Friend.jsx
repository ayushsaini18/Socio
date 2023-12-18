import FlexBetween from './FlexBetween'
import UserImage from './UserImage'
import { Box, IconButton, Typography, useTheme } from '@mui/material'
import { PersonAddOutlined, PersonRemoveOutlined } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentfriends, setfriends } from 'state'
import { useNavigate } from 'react-router-dom'

const Friend = ({freindId,freindImage,name,subtitle,}) => {
    const dispatch=useDispatch();
    const navigate=useNavigate()
    const {friends,_id:id}=useSelector(state=>state.user);
    const token = useSelector(state=>state.token);
  
    const {palette}=useTheme();
    const primaryLight=palette.primary.light;
    const primaryDark=palette.primary.dark;
    const main = palette.neutral.main;
    const medium=palette.neutral.medium;
    const isFreind = friends.find((friend) => friend._id === freindId);

    const patchFreind= async() => {
        try{
                const response = await fetch(
                  `https://sociogram-0h3b.onrender.com/users/${id}/${freindId}`,
                  {
                    method: "PATCH",
                    headers: {
                      Authorization: `Bearer ${token}`,
                      "Content-Type": "application/json",
                    },
                  }
                );
                
                // edge case scenario:-
                // we are on some user's profile page and all his posts are there on the feed if that particular user is not in the
                // loggedInUser's friends list then when we click on the addFreind button this func() executes which is sending the 
                // particular user's id to the backend where backend will update the freindList of both loggedIn user and the current user
                // but will return only the formattedList of logged in user and also we are dispatching the new friendsList of the loggedinUser
                // only so any component using the loggedUser's freind list from redux state will rerender & reflect changes but here in this
                // profile page the friendsList component is using the currentfriends state from redux which is not updated and will hence not
                // reflect changes so either we update the currentfriends list and dispatch it or do something to re render the profilepage
                // which will automatically update current list by sending request again 

                const data = await response.json();
                console.log(data);
                dispatch(setfriends({ friends: data.formattedFriends }));
                dispatch(setCurrentfriends({friends:data.formattedFriends2}));
                
              }
    
        catch(err){
          console.log(err);
            alert(err.message);
        }

    }

  return (
    <FlexBetween>
        <FlexBetween gap="1rem">
    <UserImage image={freindImage} size="55px"/>
    <Box onClick={()=>{
        navigate(`/profile/${freindId}`);
        navigate(0);
    }}
    >
        <Typography color={main}
         variant="h5"
         fontWeight="500"
         sx={{
            '&:hover':{
                color:palette.primary.light,
                cursor:"pointer",
            }
         }}
         >
            {name}
        </Typography>
        <Typography 
        color={medium}
        fontSize="0.75rem"
        >
            {subtitle}
        </Typography>
    </Box>
    </FlexBetween>

{/* to handle the case when we are at someone's profile page and the logged in user is his/her freind then we dont show add/remove icon in that
case */}
    
    {freindId!==id &&
 <IconButton 
    onClick={()=>patchFreind()}
    sx={{
        backgroundColor:primaryLight,
        p:"0.6rem"
    }}
    >
        {isFreind ? 
        <PersonRemoveOutlined sx={{color:primaryDark}}/>
        :<PersonAddOutlined sx={{color:primaryDark}}/>
    }
    </IconButton>
    }

</FlexBetween>

  )
}

export default Friend