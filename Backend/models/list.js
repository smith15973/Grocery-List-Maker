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
            default: '',
        },
        unit: {
            type: String,
            default: '',
        },
        complete: {
            type: Boolean,
            default: false,
        },
    }],

})

module.exports = mongoose.model('List', List);