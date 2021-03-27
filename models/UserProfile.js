const mongoose = require('mongoose');

// MongoDb Schema
const Schema = mongoose.Schema;
const UserProfileSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    latestPasswordChange: {
        type: String,
    },
    created: String,
    profileImage: String,
    visit: Number,
    active: Number,
    currentRide: {
        bikeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'bikes'
        },
        startingPort: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ports'
        },
        endingPort: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ports'
        },
        rider: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
        rideId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'rides'
        },
        startingTime: String,
        endingTime: String,
        totalRideTime: String
    },
    rides: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'rides'
        }
    ],
    wallet: {
        points: {
            type: Number
        },
        totalPointsUsed: {
            type: Number
        },
        cashTransections: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'transections'
            }
        ]
    }
});

// Model
const UserProfile = mongoose.model('users', UserProfileSchema);

module.exports = UserProfile;