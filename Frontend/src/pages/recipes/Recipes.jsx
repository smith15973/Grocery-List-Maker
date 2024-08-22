import { useEffect, useState } from "react"
import axios from "axios";
export function Recipes() {

    const [recipes, setRecipes] = useState([])

    async function loadRecipes() {
        const response = await axios.get('http://localhost:3000/recipes')
        setRecipes(response.data);
    }

    useEffect(() => { loadRecipes() }, [])


    const [menuItem, setMenuItem] = useState({})

    async function addToMenu(e) {
        const recipeID = e.target.id.split('-')[1];
        await axios.post('http://localhost:3000/menus', menuItem)
    }

    return (
        <>
            <h3>Recipes</h3>
            <a href="#/recipes/new">New Recipe</a>
            <ul>
                {recipes.map(recipe => {
                    return (
                        <div key={recipe._id}>
                            <li><a href={`#/recipes/${recipe._id}`}>{recipe.name}</a></li>
                            <form>
                                <input type="date" />
                                <button type="submit" id={`addToMenuButton-${recipe._id}`} onClick={(e) => { addToMenu(e) }}>Add to Menu</button>
                            </form>
                        </div>
                    )
                })}
            </ul>
        </>
    )
}
