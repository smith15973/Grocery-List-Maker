const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Recipe = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    instructions: [{
        type: String,
        // required: true,
    }],
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
    cookTime: {
        length: {
            type: Number,
            // required: true,
        },
        unit: {
            type: String,
            // required: true,
        }
    },
    cookTemp: {
        temp: {
            type: Number,
            // required: true,
        },
        unit: {
            type: String,
            // required: true,
        }
    }

})

module.exports = mongoose.model('Recipe', Recipe);