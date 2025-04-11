import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import PlusIcon from '@mui/icons-material/Add';
import axios from 'axios'
import { useState } from 'react'
import { ItemInput } from '../../components/ItemInput';

export function AddItemToList({ onItemAdded, listId, baseURL }) {


    const [addItemForm, setAddItemForm] = useState({ item: '', quantity: '', unit: '' })

    async function handleAddItem() {
        const response = await axios.post(`${baseURL}/${listId}`, {...addItemForm, item: addItemForm.item.ingredientId})
        onItemAdded()
        setAddItemForm({ item: '', quantity: '', unit: '' })
    }

    function handleChange(name, value) {
        setAddItemForm({ ...addItemForm, [name]: value });
    }

    return (
        <ListItem
            key={'newItem'}
            secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={handleAddItem}>
                    <PlusIcon />
                </IconButton>
            }
        >
            <ItemInput onFormUpdate={handleChange} form={addItemForm}/>
        </ListItem>
    )
}