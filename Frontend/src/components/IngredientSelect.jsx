import { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function IngredientSelect({ onAddIngredientFormUpdated, addIngredientForm }) {

    const [ingredients, setIngredients] = useState([])

    useEffect(() => {
        loadIngredients()
    }, [])

    async function loadIngredients() {
        try {
            const response = await axios.get(`http://localhost:3000/ingredients`)
            setIngredients(response.data)
        } catch (e) {
            console.log(e)
        }
    }



    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={ingredients.map((ingredient) => ({ label: ingredient.name, ingredientId: ingredient._id }))}
            getOptionLabel={(option) => option.label || ''}  // Converts option object to string
            sx={{ minWidth: '40%' }}
            renderInput={(params) => <TextField {...params} label="Item" />}
            isOptionEqualToValue={(option, value) => option.ingredientId === value.ingredientId}
            onChange={(e, value) => onAddIngredientFormUpdated('item', value)}
            value={addIngredientForm.item !== '' ? addIngredientForm.item : null}
        />
    );
}
