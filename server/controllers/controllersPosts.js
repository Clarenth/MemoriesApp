import express from 'express';
import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js'

const router = express.Router();

export const getPosts = async (req, res) => {
    const { page } = req.query;

    try{
        //limits the number of posts per page/user request
        const LIMIT_POSTS_BY_NUM_LIMIT = 8;

        //gets the starting index of every page 
        const startIndex = (Number(page) - 1) * LIMIT_POSTS_BY_NUM_LIMIT;
        const total = await PostMessage.countDocuments({});

        const postMessages = await PostMessage.find().sort({ _id: -1}).limit(LIMIT_POSTS_BY_NUM_LIMIT).skip(startIndex);
        console.log(postMessages)
        res.status(200).json({ data: postMessages, currentPage: Number(page), numOfPages: Math.ceil(total / LIMIT_POSTS_BY_NUM_LIMIT) });

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

//Query -> /posts?page=1 where page = 1
//PARAMS -> /posts/:id where :id is the route, and id = 123. 123 is the id of the posts
export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        //i is an ignore case. Ignores the case of the search term that's passed
        //ex: test, Test, TEST, TeSt
        const title = new RegExp(searchQuery, 'i');

        const posts = await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ] });

        res.json({ data: posts });

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage({ ...post, creator: req.userId, createAt: new Date().toISOString() });
    try{
        await newPost.save();
        res.status(201).json(newPost);

    } catch {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id}, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    await PostMessage.findByIdAndRemove(id);
    console.log('DELETE!');

    res.json({ message: 'Post deleted successfully' });
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if(!req.userId) return res.json({ message: 'Unauthenticated user' });

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with that id: ${id}`);

    const idOfPostToLike = await PostMessage.findById(id);

    const index = idOfPostToLike.likes.findIndex((id) => id === String(req.userId));
    if(index === -1) {
        //liking the post
        idOfPostToLike.likes.push(req.userId);
    } else {
        //dislike the memories post
        idOfPostToLike.likes = idOfPostToLike.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, idOfPostToLike, { new: true })
    
    res.json(updatedPost)
}

export default router;