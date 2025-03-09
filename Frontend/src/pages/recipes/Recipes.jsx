import { useEffect, useState } from "react"
import axios from "axios";
import { AddToMenuForm } from "./AddToMenuForm";
import { List } from "@mui/material";
import { ListItem } from "@mui/material";
import { ListItemButton } from "@mui/material";
import { ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";



export function Recipes() {

    const navigate = useNavigate();

    const [recipes, setRecipes] = useState([])

    async function loadRecipes() {
        const response = await axios.get('http://localhost:3000/recipes')
        setRecipes(response.data);
    }

    useEffect(() => { loadRecipes() }, [])



    return (
        <>
            <a href="#/recipes/new">New Recipe</a>
            <h3>Recipes</h3>
            <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
                {recipes.map(recipe => {
                    return (
                        <ListItem key={recipe._id}
                            disablePadding
                        >
                            <ListItemButton role={undefined} dense>
                                <ListItemText onClick={() => { navigate(`/recipes/${recipe._id}`) }} >{recipe.name}</ListItemText>
                                <AddToMenuForm recipeID={recipe._id} />
                            </ListItemButton>
                        </ListItem>


                    )
                })}
            </List>
        </>
    )
}




