import express from 'express';
import { auth } from '../middleware/auth.js';
import { getFeedPosts, getUserPosts, updateLikes } from '../controller/Post.js';
const router=express.Router();

router.get("/",auth,getFeedPosts);

router.get("/:userId",auth,getUserPosts)

router.patch('/:id/like',auth,updateLikes)
export default router;