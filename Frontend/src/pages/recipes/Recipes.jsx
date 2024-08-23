import { useEffect, useState } from "react"
import axios from "axios";
import FormDialog from "../../components/FormDialog";
import { AddToMenuForm } from "./AddToMenuForm";
export function Recipes() {

    const [recipes, setRecipes] = useState([])

    async function loadRecipes() {
        const response = await axios.get('http://localhost:3000/recipes')
        setRecipes(response.data);
    }

    useEffect(() => { loadRecipes() }, [])



    return (
        <>
            <FormDialog />
            <h3>Recipes</h3>
            <a href="#/recipes/new">New Recipe</a>
            <div>
                {recipes.map(recipe => {
                    return (
                        <div key={recipe._id}>
                            <a href={`#/recipes/${recipe._id}`}>{recipe.name}</a>
                            <AddToMenuForm recipeID={recipe._id} />
                        </div>
                    )
                })}
            </div>
        </>
    )
}
