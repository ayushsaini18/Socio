import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import multer from "multer";
import cors from 'cors';
import { fileURLToPath } from "url";
import helmet from 'helmet';
import bodyParser from "body-parser";
import morgan from "morgan";
import path from "path";

import { register } from "./controller/auth.js";
import { createPost } from "./controller/Post.js";
import { auth } from "./middleware/auth.js";

import authRoutes from './routes/auth.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';

import Post from "./models/Post.js";
import User from "./models/User.js";
import {users,posts} from './data/index.js';


//  In the given code snippet, fileUrlToPath(import.meta.url) is used to convert the file URL obtained from import.meta.url into a file system path. 
// The fileUrlToPath function is likely a custom utility function that handles the conversion.
const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);

dotenv.config();

const app=express();
app.use("/assets",express.static(path.join(__dirname,"public/assets")))
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));


/* FILE STORAGE */
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"public/assets");
    },
    filename:function(req,file,cb){
        cb(null,file.originalname);
    },

});

const upload = multer({storage});


/*ROUTES WITH FILES*/
app.post('/auth/register',upload.single("picture"),register);
app.post('/post',auth,upload.single("picture"),createPost);

/*ROUTES*/
app.use('/auth',authRoutes);
app.use('/users',userRoutes);
app.use('/posts',postRoutes);


/*MONGOOSE SETUP*/
const port=process.env.PORT || 6001;

mongoose.connect(process.env.MONGO_DB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
app.listen(port,()=>console.log(`app is running on port ${port}`));
// ADD DATA ONE TIME
// User.insertMany(users);
// Post.insertMany(posts);

})
.catch(err=>{
    console.log(`${err} could not connect`);
});