import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function IngredientUnitSelect({ onAddIngredientFormUpdated, addIngredientForm }) {

    return (
        <>
            <FormControl sx={{ minWidth: '30%' }}>
                <InputLabel id="ingredient-unit-select-label">Units</InputLabel>
                <Select
                    labelId="ingredient-unit-select"
                    id="ingredient-unit-select"
                    value={addIngredientForm.unit}
                    label="Age"
                    onChange={(e) => onAddIngredientFormUpdated('unit', e.target.value)}
                >
                    <MenuItem value={'lbs'}>lbs</MenuItem>
                    <MenuItem value={'cups'}>cups</MenuItem>
                    <MenuItem value={'oz'}>oz</MenuItem>
                </Select>
            </FormControl>
        </>
    );
}
