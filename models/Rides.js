const mongoose = require('mongoose');

// MongoDb Schema
const Schema = mongoose.Schema;
const RideSchema = new Schema({
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
    startingTime: String,
    endingTime: String,
    totalTime: String,
    charge: Number
});

// Model
const Rides = mongoose.model('rides', RideSchema);

module.exports = Rides;