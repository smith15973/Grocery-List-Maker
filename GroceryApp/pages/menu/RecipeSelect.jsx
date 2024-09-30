import Dropdown from 'react-native-input-select';
import { useEffect, useState } from "react"
import axios from "axios";
import { Text, View, Pressable } from "react-native";


export function RecipeSelect({ name, onRecipeNameChange, recipeName }) {

    const [recipeOptions, setRecipeOptions] = useState([]);




    useEffect(() => {
        loadRecipes()
    }, [])

    async function loadRecipes() {
        try {
            const response = await axios.get('http://localhost:3000/recipes');
            setRecipeOptions(response.data.map(recipe => ({ label: recipe.name, value: recipe._id })));
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <View>
            <Dropdown
                dropdownStyle={{ minHeight: 65 }}
                placeholder="Select Recipe"
                options={recipeOptions}
                selectedValue={recipeName}
                onValueChange={(value) => { onRecipeNameChange(name, value) }}
                isSearchable
                primaryColor={'deepskyblue'}
                
                searchControls={{
                    textInputProps: { placeholder: 'Search for Meals' }
                }}
            />
        </View>
    );
}
