const express = require('express');
const router = express.Router();
// const auth = require('../../middleware/auth');

//User Model
const Ad = require('../../models/Ad');

// ROUTE:   GET api/ads
// DESCR:   GET ALL ADS
// ACCES:   PUBLIC
router.get('/', async (req, res) => {
    try {
        const ads = await Ad.find().sort({ posted_date: -1 });
        res.json(ads);
    } catch (error) {
        console.error(err.message);
        res.status(500).json({msg: 'Szerver hiba :('});
    }

})


// ROUTE:   POST api/ads
// DESCR:   CREATE NEW AD
// ACCES:   PRIVATE (not yet :)
router.post('/', async (req, res) => {
    const { author, authorId, title, persOrBand, instrument, place, description } = req.body;

    try {
        const newAd = new Ad({
            authorId,
            author,
            title,
            pers_or_band: persOrBand,
            instrument,
            place,
            description
        });

        const ad = await newAd.save();
        res.json(ad);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg: 'Szerver hiba :('});
    }

})


// ROUTE:   DELETE api/ads/:id
// DESCR:   Delete AD by ID
// ACCES:   Private ( not yet )
router.delete('/:id', async (req, res) => {
    try {
        const ad = await Ad.findById(req.params.id);

        if (!ad) {
            return res.status(404).json({ msg: 'Hirdetés nem található' });
        }

        // Check user
        // if (post.user.toString() !== req.user.id) {
        //     return res.status(401).json({ msg: 'user not authorized' });
        // }

        await ad.remove();

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