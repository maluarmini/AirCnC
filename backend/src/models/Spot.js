const mongoose = require('mongoose');

const SpotSchema = new mongoose.Schema({
    thumbnail_name: {
        type: String,
        require: true,
    },
    thumbnail_url: {
        type: String,
        require: true,
    },
    company: String,
    price: Number,
    techs: [String],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
});

module.exports = mongoose.model('Spot', SpotSchema);
