const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

//POST Model
const Post = require('../../models/Post');

// ROUTE:   GET api/posts
// DESCR:   GET ALL posts
// ACCES:   PUBLIC
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ posted_date: -1 });
        res.json(posts);
    } catch (error) {
        console.error(err.message);
        res.status(500).json({msg: 'Szerver hiba :('});
    }
})

// ROUTE:   GET api/posts/user/:id
// DESCR:   GET posts BY USERID
// ACCES:   PUBLIC
router.get('/user/:userId', async (req, res) => {
    try {
        const posts = await Post.find({authorId: req.params.userId}).sort({ posted_date: -1 });
        res.json(posts);
    } catch (error) {
        console.error(err.message);
        res.status(500).json({msg: 'Szerver hiba :('});
    }
})


// ROUTE:   GET api/posts/:post_Id
// DESCR:   GET ONE post
// ACCES:   PUBLIC
router.get('/:post_Id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_Id)
        res.json(post);
    } catch (error) {
        console.error(err.message);
        res.status(500).json({msg: 'Szerver hiba :('});
    }
})


// ROUTE:   POST api/posts
// DESCR:   CREATE NEW Post
// ACCES:   PRIVATE
router.post('/', auth, async (req, res) => {
    const { author, authorId, title, persOrBand, instrument, place, description, email, phoneNum } = req.body;

    try {
        const newPost = new Post({
            authorId,
            author,
            title,
            pers_or_band: persOrBand,
            instrument,
            place,
            description,
            email,
            phoneNum
        });

        const post = await newPost.save();
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg: 'Szerver hiba :('});
    }
})

// ROUTE:   POST api/posts/:post_Id
// DESCR:   MODIFY AN post
// ACCES:   PRIVATE
router.post('/:post_Id', auth, async (req, res) => {
    const { title, persOrBand, instrument, place, description, email, phoneNum } = req.body;

    try {
        const post = await Post.findById(req.params.post_Id);

        // Check users right to MODIFY
        if (post.authorId.toString() !== req.user._id) {
            return res.status(401).json({ msg: 'Nincs jogosultságod a módosításra!' });
        }

        post.title = title;
        post.pers_or_band = persOrBand;
        post.instrument = instrument;
        post.place = place;
        post.description = description;

        post.email = email ? email : null;
        post.phoneNum = phoneNum ? phoneNum : null;

        const postResponse = await post.save();
        res.json(postResponse);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg: 'Szerver hiba :('});
    }
})

// ROUTE:   DELETE api/posts/:id
// DESCR:   Delete post by ID
// ACCES:   PRIVATE
router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: 'Hirdetés nem található' });
        }

        // Check users right to DELETE
        if (post.authorId.toString() !== req.user._id) {
            return res.status(401).json({ msg: 'Nincs jogosultságod a törlésre!' });
        }

        await post.remove();

        res.status(200).json({ msg: 'Hirdetés törölve! :)' });

    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Hirdetés nem található' });
        }
        res.status(500).json({msg: 'Szerver hiba :('});
    }
});

module.exports = router;