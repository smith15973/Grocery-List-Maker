import { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function ItemSelect({ onFormUpdated, form }) {

    const [items, setItems] = useState([])

    useEffect(() => {
        loadItems()
    }, [])

    async function loadItems() {
        try {
            const response = await axios.get(`http://localhost:3000/ingredients`)
            setItems(response.data)
        } catch (e) {
            console.log(e)
        }
    }



    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={items.map((item) => ({ label: item.name, ingredientId: item._id }))}
            getOptionLabel={(option) => option.label || ''}  // Converts option object to string
            sx={{ minWidth: '40%' }}
            renderInput={(params) => <TextField {...params} label="Item" />}
            isOptionEqualToValue={(option, value) => option.ingredientId === value.ingredientId}
            onChange={(e, value) => onFormUpdated('item', value)}
            value={form.item !== '' ? form.item : null}
        />
    );
}
