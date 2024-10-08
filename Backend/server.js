const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Ingredient = require('./models/ingredient')
const Recipe = require('./models/recipe')
const List = require('./models/list')
const Menu = require('./models/menu')
const Meal = require('./models/meal')

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
app.post('/recipes/:id', async (req, res) => {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, { $push: { ingredients: req.body } }, { new: true }).populate('ingredients.item')
    return res.json(recipe)
})

app.delete('/recipes/:id', async (req, res) => {
    const { id } = req.params
    const recipe = await Recipe.findByIdAndDelete(id)
    res.json(recipe)
});

app.delete('/recipes/:recipeId/:ingredientId', async (req, res) => {
    const { recipeId, ingredientId } = req.params
    const recipe = await Recipe.findByIdAndUpdate(recipeId, { $pull: { ingredients: { _id: ingredientId } } }, { new: true }).populate('ingredients.item')

    res.json(recipe)
})

app.get('/lists', async (req, res) => {
    const lists = await List.find().populate('ingredients.item');
    return res.json(lists)
})
app.post('/lists', async (req, res) => {
    const { name } = req.body
    if (!name || name === '') {
        return res.status(400).json({ error: 'List name is required' });
    }
    const list = new List(req.body);
    await list.save();
    return res.json(list)
})
app.get('/lists/:id', async (req, res) => {
    const list = await List.findById(req.params.id).populate('ingredients.item');
    return res.json(list)
})
app.post('/lists/:id', async (req, res) => {
    const { item, quantity, unit } = req.body
    if (!item || item === '') {
        return res.status(400).json({ error: 'Item is required' });
    }

    if (!mongoose.isValidObjectId(item)) {
        console.log('creating new ingredient')
        const ingredient = new Ingredient({ name: item });
        await ingredient.save();
        req.body.item = ingredient._id;
    }
    const list = await List.findByIdAndUpdate(req.params.id, { $push: { ingredients: req.body } }, { new: true }).populate('ingredients.item')
    return res.json(list)
})

app.delete('/lists/:id', async (req, res) => {
    const { id } = req.params
    const list = await List.findByIdAndDelete(id)
    res.json(list)
});

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



app.get('/menus', async (req, res) => {
    let { startDate, endDate } = req.query;
    startDate = new Date(startDate);
    const menus = await Menu.find( { date: { $gte: startDate, $lte: endDate } })
        .populate({
            path: 'meals',
            populate: {
                path: 'main sides',
            },
        })
        .sort({ date: 1 });

        

    
    // menus.map(menu => {
    //     menu.meals.map(meal => {
    //         console.log(meal)
    //     })
    // })
    return res.json(menus)
})
app.post('/menus', async (req, res) => {
    console.log(req.body)
    let { date, main, type, sides } = req.body;
    const meal = new Meal({ main, type, sides });
    meal.save();

    const roundDate = (date) => {
        date.setHours(0, 0, 0, 0);
        return date;
    }

    date = roundDate(new Date(date));
    console.log(date)

    let menuDay = await Menu.findOneAndUpdate({ date }, { $push: { meals: meal._id } }, { new: true }).populate("meals.main");
    
    if (!menuDay) {
        menuDay = new Menu({ date, meals: [meal._id] })
        await menuDay.save()
    }
    
    return res.json(menuDay)

})

app.delete('/menus/:menuId/:mealId', async (req, res) => {
    const { menuId, mealId } = req.params
    const menu = await Menu.findByIdAndUpdate(menuId, { $pull: { meals: mealId } }, { new: true }).populate('meals.main')
    await Meal.findByIdAndDelete(mealId)
    res.json(menu)
})

app.put('/menus/addToList', async (req, res) => {
    const { mealids, listName } = req.body;

    if (!listName || listName === '' || mealids.length === 0) {
        return res.status(400).json({ error: 'List name and meals selected are required' });
    }
    let list = await List.findOne({ name: listName });
    if (!list) {
        console.log('creating new list')
        list = new List({ name: listName, ingredients: [] });
    }

    const meals = await Meal.find({ _id: { $in: mealids } }).populate('main sides');

    meals.map(meal => {
        meal.main.ingredients.map(ingredient => {
            const { item, quantity, unit } = ingredient;
            const listIngredient = { item, quantity, unit, complete: false };
            list.ingredients.push(listIngredient);
        })
        meal.sides.map(side => {
            side.ingredients.map(ingredient => {
                const { item, quantity, unit } = ingredient;
                const listIngredient = { item, quantity, unit, complete: false };
                list.ingredients.push(listIngredient);
            })
        })
    })

    await list.save()
    return res.json(list)
})






app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`)
})


