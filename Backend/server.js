const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Ingredient = require('./models/ingredient')
const Recipe = require('./models/recipe')
const List = require('./models/list')
const Menu = require('./models/menu')

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
    const lists = await List.find().populate('ingredients.item');
    return res.json(lists)
})
app.get('/lists/:id', async (req, res) => {
    const list = await List.findById(req.params.id).populate('ingredients.item');
    return res.json(list)
})
app.post('/lists/:id', async (req, res) => {
    const list = await List.findByIdAndUpdate(req.params.id, { $push: { ingredients: req.body } }, { new: true }).populate('ingredients.item')
    return res.json(list)
})

app.put('/lists/:id/toggleCheck', async (req, res) => {
    const { id } = req.params
    const { ingredientId } = req.body
    const list = await List.findById(id).populate('ingredients.item')
    const ingredient = list.ingredients.id(ingredientId)
    ingredient.complete = !ingredient.complete;
    await list.save()
    res.json(list)
})
app.delete('/lists/:listId/:ingredientId', async (req, res) => {
    const { listId, ingredientId } = req.params
    const list = await List.findByIdAndUpdate(listId, { $pull: { ingredients: { _id: ingredientId } } }, { new: true }).populate('ingredients.item')

    res.json(list)
})

app.post('/lists', async (req, res) => {
})

app.get('/menus', async (req, res) => {
    const menus = await Menu.find().populate("meals.main").sort({ date: 1 });
    return res.json(menus)
})
app.post('/menus', async (req, res) => {
    const { date, main, type, sides } = req.body;
    let menuDay = await Menu.findOneAndUpdate({ date }, { $push: { meals: { main, type, sides } } }, { new: true });
    if (!menuDay) {
        menuDay = new Menu({ date, meals: [{ main, type, sides }] })
        await menuDay.save()
    }

    return res.json(menuDay)

})

app.put('/menus/addToList', async (req, res) => {
    const { menuDayID, listID } = req.body;
    let list;
    if (listID) {
        list = await List.findById(listID);
    } else {
        list = new List({ name: "New List", ingredients: [] });
    }

    const menuDays = await Menu.find({ _id: menuDayID }).populate("meals.main");
    menuDays.map(menu => {
        menu.meals.map(meal => {
            meal.main.ingredients.map(ingredient => {
                list.ingredients.push({ item: ingredient.item, quantity: ingredient.quantity, unit: ingredient.unit })
            })
        })
    })
    await list.save()
    return res.json(list)
})






app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`)
})


