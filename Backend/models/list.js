const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const List = new Schema({
    name: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
    },
    ingredients: [{
        item: {
            type: Schema.Types.ObjectId,
            ref: 'Ingredient'
        },
        quantity: {
            type: Number,
        },
        unit: {
            type: String,
        }
    }],

})

module.exports = mongoose.model('List', List);