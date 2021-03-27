const mongoose = require('mongoose');

// MongoDb Schema
const Schema = mongoose.Schema;
const PortSchema = new Schema({
    long: String,
    lat: String,
    area: Number,
    capacity: Number,
    occupancy: Number,
    bikes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'bikes'
        }
    ]
});

// Model
const Port = mongoose.model('ports', PortSchema);

module.exports = Port;