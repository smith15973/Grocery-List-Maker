import axios from "axios";
import { useState, useEffect } from "react";
import { Button, View } from "react-native";
import { CalendarModal } from "./CalendarModal";
import { RecipeSelect } from "./RecipeSelect";
import { MealTypeSelect } from "./MealTypeSelect";


export function AddToMenu({ onMenuUpdated }) {



    const [recipes, setRecipes] = useState([])

    async function loadRecipes() {
        const response = await axios.get('http://localhost:3000/recipes');
        setRecipes(response.data);
    }

    useEffect(() => {
        loadRecipes()
    }, [])

    const [addToMenuForm, setAddToMenuForm] = useState({
        date: new Date(),
        main: '',
        type: '',
    })

    async function addToMenu() {
        console.log(addToMenuForm)
        const response = await axios.post('http://localhost:3000/menus', addToMenuForm);
        // onMenuUpdated()
        setAddToMenuForm({
            date: new Date(),
            main: '',
            type: '',
        })
    }


    function handleChange(name, value) {
        setAddToMenuForm({ ...addToMenuForm, [name]: value })
    }


    return (
        <View>


            <CalendarModal name="date" onDateChange={handleChange} date={addToMenuForm.date} />
            <RecipeSelect name="main" onRecipeNameChange={handleChange} recipeName={addToMenuForm.main} />
            <MealTypeSelect name="type" onMealTypeChange={handleChange} mealType={addToMenuForm.type} />


            <Button title="Add to Menu" onPress={addToMenu} type="submit" />


        </View>
    )
}