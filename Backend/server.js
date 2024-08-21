const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Ingredient = require('./models/ingredient')
const Recipe = require('./models/recipe')
const List = require('./models/list')

const app = express()
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())

const dbURL = process.env.dbURL || "mongodb://localhost:27017/groceryListMaker"
mongoose.connect(dbURL)

app.get('/ingredients', async (req, res) => {
    const ingredients = await Ingredient.find({});
    return res.json(ingredients)
})
app.post('/ingredients', async (req, res) => {
    try {
        const ingredient = new Ingredient(req.body);
        await ingredient.save();
        return res.status(201).json(ingredient);  // Use 201 for creation success
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: 'An error occurred while saving the ingredient.' });  // Send an error message to the client
    }
})


app.get('/recipes', async (req, res) => {
    const recipes = await Recipe.find();
    console.log(recipes)
    return res.json(recipes)
})
app.get('/recipes/:id', async (req, res) => {
    const { id } = req.params
    const recipe = await Recipe.findById(id).populate('ingredients.item')
    return res.json(recipe)
})

app.post('/recipes', async (req, res) => {
    try {
        const recipe = new Recipe(req.body);
        await recipe.save();
        return res.status(201).json(recipe);  // Use 201 for creation success
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: 'An error occurred while saving the ingredient.' });  // Send an error message to the client
    }
})

app.get('/lists', async (req, res) => {
    const lists = await List.find();
    return res.json(lists)
})




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`)
})


