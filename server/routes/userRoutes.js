import express from 'express';
import { getUser,
getfriends,
updatefriends } from '../controller/User.js';
const router = express.Router();
import {auth} from '../middleware/auth.js';

/* READ */
router.get('/:id',auth,getUser);
router.get('/:id/friends',auth,getfriends);

/* UPDATE */
router.patch('/:id/:freindId',auth,updatefriends)

export default router; 