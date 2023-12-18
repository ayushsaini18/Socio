import React from 'react'
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import Form from '../components/Form';

const LoginPage = () => {
const theme=useTheme();
const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  return (
    <Box>
      <Box width="100%" p="1rem 6%" textAlign="center" backgroundColor={theme.palette.background.alt}>
      <Typography fontWeight="bold" fontSize="32px" color="primary"> Sociopedia</Typography>
      </Box>

      <Box width={isNonMobileScreens ?"50%" : "93%"} p="2rem" m="2rem auto" backgroundColor={theme.palette.background.alt} borderRadius="1.5rem">
      <Typography fontWeight="500" variant='h5' sx={{mb:"1.5rem"}}>
        Welcome to Sociopedia, the social media for sociopaths
      </Typography>

      <Form/>
      </Box>

    </Box>
  )
}

export default LoginPage;