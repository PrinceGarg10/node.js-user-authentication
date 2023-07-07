const express = require('express');
const router = express.Router();
const postService = require('../services/post');
const authMiddleware = require('../middleware/auth/auth');
const { validateCreatePost } = require('../validators/postValidator')


// GET /posts-user
router.get('/all-user', authMiddleware, async (req, res) => {
    try {
        const filterData = req.query
        filterData.createdBy = req.user._id
        const posts = await postService.getAllPosts(filterData);
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET /posts
router.get('/all', authMiddleware, async (req, res) => {
    try {
        const filterData = req.query
        const posts = await postService.getAllPosts(filterData);
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET /posts
router.get('/report', authMiddleware, async (req, res) => {
    try {
        const posts = await postService.findPostReportForDashboard();
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// POST /posts
router.post('/', authMiddleware, validateCreatePost, async (req, res) => {
    try {
        const data = req.body
        data.createdBy = req.user._id
        const post = await postService.createPost(data);
        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// PUT /posts/:id
router.patch('/', async (req, res) => {
    try {
        const { id, ...data } = req.body;
        const post = await postService.updatePost(id, data);
        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// DELETE /posts/:id
router.delete('/', async (req, res) => {
    try {
        const { id } = req.query;
        await postService.deletePost(id);
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
