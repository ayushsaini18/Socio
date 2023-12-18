import React from 'react';
import * as yup from 'yup';
import {Formik} from 'formik';
import { useState } from 'react';
import { Box, Button, TextField, Typography, 
    useMediaQuery, useTheme } from '@mui/material';
import Dropzone from 'react-dropzone';
import FlexBetween from './FlexBetween';
import { EditOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin } from 'state';

const registerSchema = yup.object().shape({
    firstName:yup.string().required("required"),
    lastName:yup.string().required("required"),
    email:yup.string().email("invalid email").required("required"),
    password:yup.string().required("required"),
    location:yup.string().required("required"),
    occupation:yup.string().required("required"),
    picture:yup.string().required("required"),

})
const loginSchema=yup.object().shape({
    email:yup.string().email("invalid email").required("required"),
    password:yup.string().required("required"),

})

const registerInitialvalues={
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    location:"",
    occupation:"",
    picture:"",
}
const loginInitialValues={
    email:"",
    password:"",
}

const Form = () => {

    const[page,setPage]=useState("login");
    // const [isAuth,setIsAuth]=useState(false);
    const isNonMobileScreen=useMediaQuery("(min-width:600px)");
    const navigate=useNavigate();
    const dispatch=useDispatch();
    
    const isLogin = page==="login";
    const isRegister = page==="register";

    const {palette}=useTheme();
   
    const submitHandler=async (values,onSubmitProps)=>{
         if(isRegister){
            // this allows us to send formInfo with image
           
            const formData=new FormData();
            for(let value in values){
                formData.append(value,values[value]);
            }
            // values={firstName,lastName,...} values[value] ex:- values.firstName
            formData.append("picturePath",values.picture.name);
            try{
            const savedUserResponse = await fetch("https://sociogram-0h3b.onrender.com/auth/register",{
                method:"POST",
                body:formData,
            });

            const savedUser = await savedUserResponse.json();
            // ḥere the object returned is always a user if request is successfull hence no need to check error property
            onSubmitProps.resetForm();
            if(savedUser) 
            setPage("login");
        }
        catch(err){
            alert(err.message);
        }

        }
        else{

            try{
            const loggedInResponse=await fetch("https://sociogram-0h3b.onrender.com/auth/login",{
                method:"POST",
                body:JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json',
                    // Additional headers if needed
                  },
            })

            const loggedInData = await loggedInResponse.json(); //it will return a object containing {user,token}
            onSubmitProps.resetForm();
            if(loggedInData.user){
            dispatch(setLogin(loggedInData));
            navigate("/home");}

            else{
                alert(loggedInData.error);
            }

        }
        catch(err){
            alert(err.message);
        }
        
        }
    };

  return (
// shorthand for rendering content within the <Formik> component using the render prop pattern. 
// The <Formik> component accepts a function as its child, and this function is called with an
//  object containing several useful properties and methods related to the form state and form manipulation.

    <Formik  onSubmit={submitHandler}
    initialValues={isLogin ? loginInitialValues : registerInitialvalues} 
    validationSchema={isLogin?loginSchema:registerSchema}
   >

     {({values,errors,touched,handleSubmit,handleChange,handleBlur,setFieldValue,resetForm})=>(
        <form onSubmit={handleSubmit}>
            <Box display="grid" gap="30px" gridTemplateColumn="repeat(4,minmax(0,1fr))"
            sx={{
                "&>div":{gridColumn:isNonMobileScreen?undefined:"span 4"},
            }}
            >
                {/* TEXTFIELDS FOR REGISTERPAGE */}
                {isRegister && (
                    <>
                 <TextField
                 label="firstName"
                 onChange={handleChange}
                 onBlur={handleBlur}
                 value={values.firstName}
                 name="firstName"
                 error={Boolean(touched.firstName)&&Boolean(errors.firstName)}
                 helperText={touched.firstName&&errors.firstName}
                 sx={{gridColumn:"span 2"}}
                 />  
                 <TextField
                 label="lastName"
                 onChange={handleChange}
                 onBlur={handleBlur}
                 value={values.lastName}
                 error={Boolean(touched.lastName)&&Boolean(errors.lastName)}
                 name="lastName"
                 helperText={touched.lastName&&errors.lastName}
                 sx={{gridColumn:"span 2"}}
                 />  
                 <TextField label="location"
                 onChange={handleChange}
                 onBlur={handleBlur}
                 value={values.location}
                 error={Boolean(touched.location)&&Boolean(errors.location)}
                 name="location"
                 helperText={touched.location&&errors.location}
                 sx={{gridColumn:"span 4"}}
                 />  
                 <TextField
                 label="occupation"
                 value={values.occupation}
                 onChange={handleChange}
                 onBlur={handleBlur}
                 error={Boolean(touched.occupation)&&Boolean(errors.occupation)}
                 name="occupation"
                 helperText={touched.occupation&&errors.occupation}
                 sx={{gridColumn:"span 4"}}
                 />  

                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
{/* getRootProps(): This is a function provided by React Dropzone that returns the necessary props to be spread 
onto the root element of the Dropzone area. It handles drag-and-drop functionality and click events. */}

                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
{/* getInputProps(): This is another function provided by React Dropzone that returns the necessary props 
to be spread onto the file input element. It handles file selection and triggering the file selection dialog. */}
                                           <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlined />
                          </FlexBetween>
                        )}
                      </Box>
                            )}
                    </Dropzone>

                </Box>

                 </>
                )}

                {/* COMMON TEXTFIELDS FOR BOTH LOGIN AND REGISTER PAGE */}
                 <TextField
                 label="E-mail"
                 value={values.email}
                 onChange={handleChange}
                 onBlur={handleBlur}
                 error={Boolean(touched.email)&&Boolean(errors.email)}
                 name="email"
                 helperText={touched.email&&errors.email}
                 sx={{gridColumn:"span 4"}}
                 />  
                <TextField
                 label="password"
                 type='password'
                 value={values.password}
                 onChange={handleChange}
                 onBlur={handleBlur}
                 error={Boolean(touched.password)&&Boolean(errors.password)}
                 name="password"
                 helperText={touched.password&&errors.password}
                 sx={{gridColumn:"span 4"}}
                />
                
            </Box>
            
            {/* BUTTONS */}
            <Box >
                <Button fullWidth
                type='submit'
                sx={{
                    m:"2rem 0",
                    p:"1rem",
                    backgroundColor:palette.primary.main,
                    color:palette.background.alt,
                    "&:hover":{
                        color:palette.primary.main,
                    }
                }}
                >
                    {isLogin?"LOGIN":"REGISTER"}
                </Button>
                <Typography onClick={
                    ()=>{ isLogin ? setPage("register") : setPage("login")
                    resetForm();
                    }}
                    sx={{
                        textDecoration:"underline",
                        color:palette.primary.main,
                        "&:hover":{
                            cursor:"pointer",
                            color:palette.primary.light,
                        },
                    }}>
                        {isLogin
                        ? "Don't have an account, sign up here."
                        : "Already have an account, log in here."
                        }
                </Typography>
            </Box>

        </form>
     )}   

    </Formik>
  )
}

export default Form;

 