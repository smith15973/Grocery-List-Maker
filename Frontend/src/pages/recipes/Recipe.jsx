import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { ListOfItems } from '../lists/ListOfItems'


export function Recipe() {

    const routeParams = useParams()

    const [recipe, setRecipe] = useState({ ingredients: [] })

    useEffect(() => {
        loadRecipe()
    }, [routeParams.id])

    async function loadRecipe() {
        try {
            const response = await axios.get(`http://localhost:3000/recipes/${routeParams.id}`)
            setRecipe(response.data)
        } catch (e) {
            console.log(e)
        }
    }
    const ingredientsList = recipe.ingredients.map(ingredient => ingredient)
    return (
        <>
            <a href="#/recipes">Back to Recipes</a>
            <h3>{recipe.name} - {recipe.type}</h3>
            
            <ListOfItems list={ingredientsList} listId={recipe._id} loadList={loadRecipe} baseURL="http://localhost:3000/recipes" />
            
        </>
    )
}
