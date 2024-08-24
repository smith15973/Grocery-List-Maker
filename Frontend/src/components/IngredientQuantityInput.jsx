import { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function IngredientQuantityInput({ onAddIngredientFormUpdated, addIngredientForm }) {

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { minWidth: '30%' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                id="outlined-number"
                label="Qty"
                type="number"
                value={addIngredientForm.quantity}
                onChange={(e) => onAddIngredientFormUpdated('quantity', e.target.value)}
            />
        </Box>
    );
}
