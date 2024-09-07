import axios from 'axios'
import { useEffect, useState } from 'react'
import { SafeAreaView, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { ListOfItems } from '../lists/ListOfItems';

export function ShowRecipe({ route }) {
    const navigation = useNavigation();

    const [recipe, setRecipe] = useState({ ingredients: [] })

    useEffect(() => {
        loadRecipe()
    }, [])

    async function loadRecipe() {
        try {
            const response = await axios.get(`http://localhost:3000/recipes/${route.params.id}`)
            setRecipe(response.data)
        } catch (e) {
            console.log(e)
        }
    }
    navigation.setOptions({ title: recipe.name })

    const ingredientsList = recipe.ingredients.map(ingredient => ingredient)
    return (
        <SafeAreaView>
            <ListOfItems list={ingredientsList} listId={recipe._id} loadList={loadRecipe} baseURL="http://localhost:3000/recipes" />
        </SafeAreaView>




    );
}

