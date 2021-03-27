const express = require('express');
const router = express.Router();
const Port = require('../models/Port');
var ObjectId = require('mongodb').ObjectID;
const passport = require("passport");

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get('/:portId', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    const portId = req.params.portId;
    Port.findById(ObjectId(portId)).then((data) => {
        res.status(200).json(data);
    });
});

module.exports = router;