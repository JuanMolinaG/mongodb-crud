const router = require('express').Router();
const Post = require('../models/Posts');
const verifyToken = require('../helpers/tokenValidation');
const { postValidation } = require('../helpers/dataValidation');

// Get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.send(posts);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Create a post
router.post('/', verifyToken, async (req, res) => {
    // Validate the data
    const { error } = postValidation(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    // Create the post
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
    });
    try {
        const savedPost = await post.save();
        res.send(savedPost);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Get a post by id
router.get('/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) return res.status(404).json({ error: 'Post not found' });
        res.send(post);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Delete a post by id
router.delete('/:postId', verifyToken, async (req, res) => {
    try {
        const deleted = await Post.deleteOne({ _id: req.params.postId });
        if (deleted.n == 0)
            return res
                .status(400)
                .json({ error: 'Does not exist a post with this id' });
        res.json({ success: 'Post deleted' });
    } catch (err) {
        res.status(400).send(err);
    }
});

// Update a post by id
router.put('/:postId', verifyToken, async (req, res) => {
    // Validate the data
    const { error } = postValidation(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const updated = await Post.updateOne(
            { _id: req.params.postId },
            {
                $set: {
                    title: req.body.title,
                    description: req.body.description,
                },
            }
        );
        if (updated.n == 1) res.json({ success: 'Post updated' });
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
