import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Ingredient } from '../../components/Ingredient'

export function Recipe() {

    const routeParams = useParams()

    const [recipe, setRecipe] = useState({})

    useEffect(() => {
        loadRecipe()
    }, [])

    async function loadRecipe() {
        try {
            const response = await axios.get(`http://localhost:3000/recipes/${routeParams.id}`)
            setRecipe(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <a href="#/recipes">Back to Recipes</a>
            <h3>{recipe.name}</h3>
            {recipe.ingredients && recipe.ingredients.length ? (
                <div>
                    <h4>Ingredients</h4>
                    <ul>
                        {recipe.ingredients.map(ingredient => {
                            return (
                                <Ingredient key={ingredient.item._id} ingredient={ingredient.item} />
                            )
                        })}
                    </ul>
                </div>
            ) : ''}
        </>
    )
}
