import { Box } from '@mui/material'

const UserImage = ({image,size="60px"}) => {
  
    return (
    <Box width={size} height={size}>
    
    <img width={size}
    height={size}
    style={{objectFit:"cover",borderRadius:"50%"}}
    alt="user"
    src={`https://sociogram-0h3b.onrender.com/assets/${image}`}
    
    />

    </Box>
  )

} 
export default UserImage;