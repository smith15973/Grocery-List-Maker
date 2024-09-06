import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import PlusIcon from '@mui/icons-material/Add';
import axios from 'axios'
import { useState } from 'react'
import IngredientSelect from '../../components/IngredientSelect';
import IngredientQuantityInput from '../../components/IngredientQuantityInput';
import IngredientUnitSelect from '../../components/IngredientUnitSelect';

export function AddItemToList({ onItemAdded, listId, baseURL }) {


    const [addIngredientForm, setAddIngredientForm] = useState({ item: '', quantity: '', unit: '' })

    async function handleAddIngredient() {
        const response = await axios.post(`${baseURL}/${listId}`, {...addIngredientForm, item: addIngredientForm.item.ingredientId})
        onItemAdded()
        setAddIngredientForm({ item: '', quantity: '', unit: '' })
    }

    function handleChange(name, value) {
        setAddIngredientForm({ ...addIngredientForm, [name]: value });
    }

    return (
        <ListItem
            key={'newItem'}
            secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={handleAddIngredient}>
                    <PlusIcon />
                </IconButton>
            }
        >
            <IngredientSelect onAddIngredientFormUpdated={handleChange} addIngredientForm={addIngredientForm} />
            <IngredientQuantityInput onAddIngredientFormUpdated={handleChange} addIngredientForm={addIngredientForm} />
            <IngredientUnitSelect onAddIngredientFormUpdated={handleChange} addIngredientForm={addIngredientForm} />
        </ListItem>
    )
}