const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Ingredient = new Schema({
    name: {
        type: String,
        required: true,
    },
    group: {
        type: String,
        default: 'Other',
        required: true,
        
    },
    stores: [{
        name: {
            type: String,
            required: true,
        },
        aisle: {
            type: String,
        },
        price: {
            type: Number,
        }
    }]
})

module.exports = mongoose.model('Ingredient', Ingredient);