const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Menu = new Schema({
    date: {
        type: Date,
        required: true,
    },
    meals: [{
        type: Schema.Types.ObjectId,
        ref: 'Meal'
    }]



})

module.exports = mongoose.model('Menu', Menu);