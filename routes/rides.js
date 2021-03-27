const express = require('express');
const router = express.Router();
const UserProfile = require('../models/UserProfile');
const Rides = require('../models/Rides');
const Bike = require('../models/Bike');
const Port = require('../models/Port');
var ObjectId = require('mongodb').ObjectID;
const passport = require("passport");

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post('/startride', passport.authenticate('jwt', { session: false }), async function (req, res, next) {
    const value = {
        bikeId: req.body.bikeId,
        startingPort: req.body.startingPort,
        rider: req.user._id,
        startingTime: Date.now()
    }

    const newRide = new Rides(value);
    await newRide.save(function (err, result) {
        const value2 = {
            bikeId: req.body.bikeId,
            startingPort: req.body.startingPort,
            rider: req.user._id,
            startingTime: Date.now(),
            rideId: result._id
        }
        UserProfile.updateOne({ _id: req.user._id }, { $set: { currentRide: value2 } }, { upsert: true }, function (err, doc) {
            if (err) return res.status(500).send({ error: err });
            Bike.updateOne({ _id: value2.bikeId }, { $set: { currentRider: req.user._id } }, { upsert: true }, function (err, doc) {
                if (err) return res.status(500).send({ error: err });
                Port.updateOne({ _id: value2.startingPort }, { $pull: { bikes: value2.bikeId } }, { upsert: true }, function (err, doc) {
                    if (err) return res.status(500).send({ error: err });
                    return res.json({
                        message: 'Ride Started!!'
                    });
                });
            });
        });
    });
});

router.get('/currentride', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    UserProfile.findById(ObjectId(req.user._id)).then((data) => {
        res.status(200).json(data.currentRide);
    });
});

router.get('/ridesummary/:rideId', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    const rideId = req.params.rideId;
    Rides.findById(ObjectId(rideId)).then((data) => {
        res.status(200).json(data);
    });
});

router.get('/', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    UserProfile.findById(ObjectId(req.user._id)).then((data) => {
        res.status(200).json(data.rides);
    });
});

router.post('/endride', passport.authenticate('jwt', { session: false }), async function (req, res, next) {
    const rideId = req.body.rideId;
    const tt = req.body.tt;
    const points = req.body.points;
    console.log("Total Time: " + tt);
    const value = {
        endingTime: Date.now(),
        totalTime: tt,
        charge: points
    }

    Rides.updateOne({ _id: rideId }, { $set: value }, function (err, doc) {
        if (err) return res.status(500).send({ error: err });
        Rides.findById(ObjectId(rideId)).then((data) => {
            const ride = data;
            const value2 = {}
            UserProfile.updateOne({ _id: req.user._id }, { $set: { currentRide: value2 }, $push: { rides: rideId } }, { upsert: true }, function (err, doc) {
                if (err) return res.status(500).send({ error: err });
                Bike.updateOne({ _id: ride.bikeId }, { $set: { currentRider: null } }, { upsert: true }, function (err, doc) {
                    if (err) return res.status(500).send({ error: err });
                    // Port.updateOne({ _id: ride.endingPort }, { $push: { bikes: ride.bikeId } }, { upsert: true }, function (err, doc) {
                    //     if (err) return res.status(500).send({ error: err });
                    //     return res.json({
                    //         message: 'Data Updated!!'
                    //     });
                    // });
                    return res.json({
                        message: 'Data Updated!!'
                    });
                });
            });
        });
    });
});

module.exports = router;