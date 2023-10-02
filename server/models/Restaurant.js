const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    restaurantName: { type: String, required: true },
    district: { type: Number, required: true },
    city: { type: Number, required: true },
    parish: { type: Number, required: true },
    tags: [String]
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
