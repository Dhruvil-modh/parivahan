const mongoose = require('mongoose');

// MongoDb Schema
const Schema = mongoose.Schema;
const TransectionSchema = new Schema({
    date: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    points: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String
    },
    transectionId: {
        type: String
    },
    paymentId: {
        type: String
    }
});

// Model
const Transection = mongoose.model('transections', TransectionSchema);

module.exports = Transection;