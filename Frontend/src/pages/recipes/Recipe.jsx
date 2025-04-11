import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { ListOfItems } from '../lists/ListOfItems'
import { Button, Container, Typography } from '@mui/material'


export function Recipe() {

    const navigate = useNavigate();
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
        <Container>
            <Button variant='outlined' onClick={() => navigate('/recipes')}>Back to Recipes</Button>
            <Typography variant='h4' align='center'>{recipe.name} - {recipe.type}</Typography>
            
            <ListOfItems list={ingredientsList} listId={recipe._id} loadList={loadRecipe} baseURL="http://localhost:3000/recipes" />
            
        </Container>
    )
}
