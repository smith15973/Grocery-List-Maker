import { Text } from "@rneui/base";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button, View } from "react-native";


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
        date: '',
        main: '',
        type: '',
    })

    async function addToMenu() {
        console.log(addToMenuForm)
        // const response = await axios.post('http://localhost:3000/menus', addToMenuForm);
        onMenuUpdated()
        setAddToMenuForm({
            date: '',
            main: '',
            type: '',
        })
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setAddToMenuForm({ ...addToMenuForm, [name]: value })
    }


    return (
        <View>
            <Text>Add to Menu</Text>

            {/* <input
                    onChange={(e) => { handleChange(e) }}
                    type="date"
                    name="date"
                    value={addToMenuForm.date}
                    required
                />
                <select
                    onChange={(e) => { handleChange(e) }}
                    name="main"
                    value={addToMenuForm.main}
                    required
                >
                    <option value="">Select...</option>
                    {recipes.map(recipe => {
                        return (
                            <option
                                key={recipe._id}
                                value={recipe._id}
                            >
                                {recipe.name}
                            </option>
                        )
                    })}
                </select>
                
                <select
                    name="type"
                    onChange={(e) => { handleChange(e) }}
                    value={addToMenuForm.type}
                    required
                >
                    <option value="">Select...</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Snack">Snack</option>
                    <option value="Dessert">Dessert</option>
                </select> */}

            <Button title="Add to Menu" onPress={addToMenu} type="submit" />

        </View>
    )
}