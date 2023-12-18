import { AttachFileOutlined, DeleteOutlined,
     EditOutlined,
     GifBoxOutlined, ImageOutlined, MicOutlined, MoreHorizOutlined } from '@mui/icons-material'
import { Box, Button, Divider, IconButton, InputBase, Typography,
     useMediaQuery,
     useTheme } from '@mui/material'
import FlexBetween from 'components/FlexBetween'
import UserImage from 'components/UserImage'
import WidgetWrapper from 'components/WidgetWrapper'
import Dropzone from 'react-dropzone'
import  { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPosts } from 'state'


const MyPostWidget = ({picturePath}) => {
    const [imageClicked,setImageClicked]=useState(false);
    const [image,setImage]=useState(null);
    const [description,setDescription]=useState("");
    const isNonMobileScreen=useMediaQuery("(min-width:1000px)");
    const post = image || description ;

    const {palette}=useTheme();
    const token=useSelector(state=>state.token);
    const dispatch=useDispatch();

    const mediumMain=palette.neutral.mediumMain;
    const medium=palette.neutral.medium;

    const handleInputChange=(event)=>{
        setDescription(event.target.value);
    }

    const createPost= async()=>{
        const formData= new FormData();
        formData.append("description",description);
        
        if(image){
        formData.append("picture",image);
        formData.append("picturePath",image.name);}

        try{
        const response = await fetch("https://sociogram-0h3b.onrender.com/post",{ //this end point returns all the posts as response
            method:"POST",
            headers:{
                'Authorization':`Bearer ${token}`,
            } ,
            body:formData
        })

        const posts= await response.json();
        dispatch(setPosts({posts}));
        setImage(null);
        setImageClicked(false);
        setDescription("");
    }
    catch(err){
        alert(err.message);
    }

    }

  return (
    <WidgetWrapper>
        <FlexBetween gap="1.5rem">
            <UserImage image={picturePath}/>
            <InputBase 
            placeholder="What's on your mind..." 
            onChange={handleInputChange}
            value={description}
            sx={{
                width:"100%",
                backgroundColor:palette.neutral.light,
                borderRadius:"2rem",
                padding:"1rem 2rem",
            }}
            />
        </FlexBetween>

        {imageClicked &&
       <Box
       width="100%"
       border={`1px solid ${medium}`}
       borderRadius="5px"
       p="1rem"
       mt="1rem"
     >
       <Dropzone
         acceptedFiles=".jpg,.jpeg,.png"
         multiple={false}
         onDrop={(acceptedFiles) =>
           setImage(acceptedFiles[0])
         }
       >
         {({ getRootProps, getInputProps }) => (
           <FlexBetween>
           <Box
             {...getRootProps()}
             border={`2px dashed ${palette.primary.main}`}
             p="1rem"
             width="100%"
             sx={{ "&:hover": { cursor: "pointer" } }}
           >

            <input {...getInputProps()} />
             {!image ? (
               <p>Add Image Here</p>
             ) : (
               <FlexBetween>
                 <Typography>{image.name}</Typography>
                 <EditOutlined/>
               </FlexBetween>
             )}
             
             </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
                 )}
         </Dropzone>
     </Box>
        }

<Divider sx={{ margin: "1.25rem 0" }} />
       
        <FlexBetween gap="1rem">
            <FlexBetween gap="0.2rem" onClick={()=>setImageClicked(true)} >
            <ImageOutlined sx={{ color: mediumMain }} />
                <Typography color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Image
                </Typography>
            </FlexBetween>
            {isNonMobileScreen ? (
                <>
            <FlexBetween gap="0.25rem">
                <GifBoxOutlined sx={{color:mediumMain}}/>
                <Typography color={mediumMain}> Clip</Typography>
            </FlexBetween>
            
            <FlexBetween gap="0.25rem">
               <AttachFileOutlined sx={{color:mediumMain}}/>
                <Typography color={mediumMain}>Attachment</Typography>
            </FlexBetween>
            
            <FlexBetween gap="0.25rem">
                <MicOutlined sx={{color:mediumMain}}/>
                <Typography color={mediumMain}> Audio </Typography>
            </FlexBetween>
            </>
            ):(
                <FlexBetween gap="0.25rem">
                    <MoreHorizOutlined sx={{color:mediumMain}}/>
                </FlexBetween>
            )
            }

            {/* BUTTON */}
            <Button 
            disabled={!post}
            onClick={createPost}
            sx={{
                color:palette.background.alt,
                backgroundColor:palette.primary.main,
                borderRadius:"3rem",
            }}
            >
                POST
            </Button>
        </FlexBetween>
    </WidgetWrapper>
  )
}

export default MyPostWidget
