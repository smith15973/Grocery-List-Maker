import { useEffect, useState } from "react"
import axios from "axios";
import { Button, ScrollView, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RecipeItemInList } from "./RecipeItemInList";
export function Recipes() {
    const navigation = useNavigation();
    const [recipes, setRecipes] = useState([])

    async function loadRecipes() {
        const response = await axios.get('http://localhost:3000/recipes')
        setRecipes(response.data);
    }

    useEffect(() => {
        loadRecipes();
        navigation.setOptions({ headerRight: () => <Button title="New Recipe" onPress={() => navigation.navigate('New Recipe')} /> });
    }, [])






    return (
        <ScrollView>
            {recipes.map(recipe => {
                return (
                    <View key={recipe._id}>
                        <RecipeItemInList recipe={recipe} onRecipeListUpdated={loadRecipes} />
                        {/* <AddToMenuForm recipeID={recipe._id} /> */}
                    </View>
                )
            })}
        </ScrollView>

    )
}