const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Menu = new Schema({
    date: {
        type: Date,
        required: true,
    },
    meals: [{
        main: {
            type: Schema.Types.ObjectId,
            ref: 'Recipe'
        },
        sides: [{
            recipe: {
                type: Schema.Types.ObjectId,
                ref: 'Recipe'
            },
            ingredient: {
                type: Schema.Types.ObjectId,
                ref: 'Ingredient'
            }
        }],
        type: {
            type: String,
            enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert']
        }

    }]



})

module.exports = mongoose.model('Menu', Menu);