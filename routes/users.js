const express = require('express');
const router = express.Router();
const UserProfile = require('../models/UserProfile');
var ObjectId = require('mongodb').ObjectID;
const passport = require("passport");

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get('/', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    UserProfile.findById(ObjectId(req.user._id)).then((data) => {
        res.status(200).json(data);
    });
});

module.exports = router;