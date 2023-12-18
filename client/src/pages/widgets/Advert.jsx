import { Typography, useTheme } from '@mui/material'
import FlexBetween from 'components/FlexBetween'
import WidgetWrapper from 'components/WidgetWrapper'

const Advert = () => {
    const {palette}=useTheme();

    const dark=palette.neutral.dark,
    medium=palette.neutral.medium,
    main=palette.neutral.main;
    

  return (
    <WidgetWrapper>
        <FlexBetween >
        <Typography color={dark} variant='h5'
        fontWeight="500"
        >Sponsored</Typography>
        <Typography color={medium}>Create Ad</Typography>
        </FlexBetween>

        <img src="https://sociogram-0h3b.onrender.com/assets/info4.jpeg"
        alt="ad"
        width="100%"
        height="auto"
        style={{ borderRadius:"0.75rem" ,margin:"0.75rem 0"}}
        />

        <FlexBetween >
            <Typography color={main}>MikaCosmetics</Typography>
            <Typography color={medium}>mikacosmetics.com</Typography>
        </FlexBetween>
        
        <Typography color={medium} m="0.5rem 0">
            Your pathway to stunning and immaculate beauty and made sure your skin is 
            exfoilating shinning like light
        </Typography>
    </WidgetWrapper>
  )
}

export default Advert