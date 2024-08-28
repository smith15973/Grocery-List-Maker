import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ListSelect({ onListNameChange, listName }) {

    const [lists, setLists] = useState([])

    async function loadLists() {
        const response = await axios.get('http://localhost:3000/lists');
        setLists(response.data);
    }

    useEffect(() => {
        loadLists()
    }, [])



    return (
        <Stack spacing={2} sx={{ width: 300 }}>
            <Autocomplete
                inputValue={listName}
                id="free-solo-demo"
                freeSolo
                options={lists.map((list) => list.name)}
                renderInput={(params) => <TextField {...params} label="List Name" />}
                onInputChange={(event, value) => onListNameChange({ target: { value } })}
            />
        </Stack>
    );
}