const express = require('express');
const router = express.Router();
const Bike = require('../models/Bike');
var ObjectId = require('mongodb').ObjectID;
const passport = require("passport");

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get('/:bikeId', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    const bikeId = req.params.bikeId;
    Bike.findById(ObjectId(bikeId)).then((data) => {
        res.status(200).json(data);
    });
});

module.exports = router;