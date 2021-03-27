const express = require('express');
const router = express.Router();
const UserProfile = require('../models/UserProfile');
const Transaction = require('../models/Transaction');
var ObjectId = require('mongodb').ObjectID;
const passport = require("passport");

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get('/', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    UserProfile.findById(ObjectId(req.user._id)).then((data) => {
        res.status(200).json(data.wallet);
    });
});

router.get('/transactions', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    UserProfile.findById(ObjectId(req.user._id)).then((data) => {
        res.status(200).json(data.wallet.cashTransections);
    });
});

router.get('/transaction/:id', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    const transectionId= req.params.id;
    Transaction.findById(ObjectId(transectionId)).then((data) => {
        res.status(200).json(data);
    });
});

router.post('/addpoints', passport.authenticate('jwt', { session: false }), async function (req, res, next) {
    const transactionDetails = {
        date: Date.now(),
        owner: req.user._id,
        amount: req.body.amount,
        points: req.body.points
    }
    const newTransaction = new Transaction(transactionDetails);
    await newTransaction.save(function (err, result) {
        const transactionId = result._id;
        UserProfile.findById(ObjectId(req.user._id)).then((data) => {
            const oldPoints = data.wallet.points;
            const points = oldPoints + req.body.points;
            UserProfile.updateOne({ _id: req.user._id }, { $set: { "wallet.points": points }, $push: { "wallet.cashTransections": transactionId } }, { upsert: true }, function (err, doc) {
                if (err) return res.status(500).send({ error: err });
                UserProfile.findById(ObjectId(req.user._id)).then((data) => {
                    res.status(200).json(data.wallet);
                });
            });
        });
    });
});

router.post('/charges', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    UserProfile.findById(ObjectId(req.user._id)).then((data) => {
        const oldPoints = data.wallet.points;
        const points = oldPoints - req.body.points;
        const oldUsedPoints = data.wallet.totalPointsUsed;
        const usedPoints = oldUsedPoints + req.body.points;
        UserProfile.updateOne({ _id: req.user._id }, { $set: { "wallet.points": points, "wallet.totalPointsUsed": usedPoints } }, { upsert: true }, function (err, doc) {
            if (err) return res.status(500).send({ error: err });
            return res.json({
                message: 'Points Charged!!'
            });
        });
    });
});

module.exports = router;