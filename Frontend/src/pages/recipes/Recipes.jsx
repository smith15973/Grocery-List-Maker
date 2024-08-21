import { useEffect, useState } from "react"
import axios from "axios";
export function Recipes() {

    const [recipes, setRecipes] = useState([])

    async function loadRecipes() {
        const response = await axios.get('http://localhost:3000/recipes')
        setRecipes(response.data);
    }

    useEffect(() => { loadRecipes() }, [])

    return (
        <>
            <h3>Recipes</h3>
            <a href="#/recipes/new">New Recipe</a>
            <ul>
                {recipes.map(recipe => {
                    return (
                        <li key={recipe._id}><a href={`#/recipes/${recipe._id}`}>{recipe.name}</a></li>
                    )
                })}
            </ul>
        </>
    )
}
