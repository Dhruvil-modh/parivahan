const mongoose = require('mongoose');

// MongoDb Schema
const Schema = mongoose.Schema;
const BikeSchema = new Schema({
    model: String,
    registration: String,
    activated: Number,
    active: Boolean,
    portId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ports'
    },
    currentRider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
});

// Model
const Bike = mongoose.model('bikes', BikeSchema);

module.exports = Bike;