import { useEffect, useState } from "react"
import axios from "axios";
import { AddToMenuForm } from "./AddToMenuForm";
import { Button, Container, List, Typography } from "@mui/material";
import { ListItem } from "@mui/material";
import { ListItemButton } from "@mui/material";
import { ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { NewRecipe } from "./NewRecipe";



export function Recipes() {

    const navigate = useNavigate();

    const [recipes, setRecipes] = useState([])

    async function loadRecipes() {
        const response = await axios.get('http://localhost:3000/recipes')
        setRecipes(response.data);
    }

    useEffect(() => { loadRecipes() }, [])



    return (
        <Container>
            <Button variant="outlined" onClick={() => navigate("/recipes/new")}>New Recipe</Button>
            <Typography variant='h4' align='center'>Recipes</Typography>
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
        </Container>
    )
}




