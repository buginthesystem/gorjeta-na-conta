const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    district: { type: String, required: true },
    place_id: { type: String, required: true, unique: true },
    tags: [String],
    url: { type: String, required: false },
    confirmations: { type: Number, default: 1 },
    confirmers: [String]
},
{
    timestamps: true
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
