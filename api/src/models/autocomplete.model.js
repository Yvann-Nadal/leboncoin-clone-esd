const mongoose = require('mongoose');

const autocompleteSchema = new mongoose.Schema({
    formatted_address: {
        type: String
    },
    street_number: {
        type: String
    },
    route: {
        type: String
    },
    city: {
        type: String
    },
    administrative_area_level_1: {
        type: String
    },
    administrative_area_level_2: {
        type: String
    },
    country: {
        type: String
    },
    postal_code: {
        type: String
    },
    lat: {
        type: Number
    },
    lng: {
        type: Number
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
})

const Autocomplete = mongoose.model('Autocomplete', autocompleteSchema);

module.exports = Autocomplete;