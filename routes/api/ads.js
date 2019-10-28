const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

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

// ROUTE:   GET api/ads/user/:id
// DESCR:   GET ADS BY USERID
// ACCES:   PUBLIC
router.get('/user/:userId', async (req, res) => {
    try {
        const ads = await Ad.find({authorId: req.params.userId}).sort({ posted_date: -1 });
        res.json(ads);
    } catch (error) {
        console.error(err.message);
        res.status(500).json({msg: 'Szerver hiba :('});
    }
})


// ROUTE:   GET api/ads/:ad_Id
// DESCR:   GET ONE AD
// ACCES:   PUBLIC
router.get('/:ad_Id', async (req, res) => {
    try {
        const ad = await Ad.findById(req.params.ad_Id)
        res.json(ad);
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
// ACCES:   Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const ad = await Ad.findById(req.params.id);

        if (!ad) {
            return res.status(404).json({ msg: 'Hirdetés nem található' });
        }

        // Check users right to delete
        if (ad.authorId.toString() !== req.user._id) {
            return res.status(401).json({ msg: 'Nincs jogosultságod a törlésre!' });
        }

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