import express from 'express';

import { getPosts, getPostsBySearch, createPost, updatePost, deletePost, likePost } from '../controllers/controllersPosts.js'; 
import authUserPermission from '../middleware/authMiddleWare.js';

const routerPosts = express.Router();

//REMEMBER: all these routes begin with /posts/ before the next param
routerPosts.get('/', getPosts);
routerPosts.get('/search', getPostsBySearch);
routerPosts.post('/', authUserPermission, createPost);
routerPosts.patch('/:id', authUserPermission, updatePost);
routerPosts.delete('/:id', authUserPermission, deletePost);
routerPosts.patch('/:id/likePost', authUserPermission, likePost);

export default routerPosts;