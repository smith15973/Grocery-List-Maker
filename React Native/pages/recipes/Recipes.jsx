import { useEffect, useState } from "react"
import axios from "axios";
import { ScrollView, Text, View } from "react-native";
export function Recipes() {

    const [recipes, setRecipes] = useState([])

    async function loadRecipes() {
        const response = await axios.get('http://localhost:3000/recipes')
        setRecipes(response.data);
    }

    useEffect(() => { loadRecipes() }, [])



    return (
        <View>
            <Text>Recipes</Text>
            <Text>New Recipe</Text>
            <ScrollView>
                {recipes.map(recipe => {
                    return (
                        <View key={recipe._id}>
                            <Text>{recipe.name}</Text>
                            {/* <AddToMenuForm recipeID={recipe._id} /> */}
                        </View>
                    )
                })}
            </ScrollView>
        </View>
    )
}