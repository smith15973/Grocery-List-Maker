const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Meal = new Schema({

    main: {
        type: Schema.Types.ObjectId,
        ref: 'Recipe'
    },
    sides: [{
        type: Schema.Types.ObjectId,
        ref: 'Recipe'
    }],
    type: {
        type: String,
        enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert']
    }





})

module.exports = mongoose.model('Meal', Meal);