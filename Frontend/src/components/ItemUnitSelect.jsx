import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function ItemUnitSelect({ onFormUpdated, form }) {

    return (
        <>
            <FormControl sx={{ minWidth: '30%' }}>
                <InputLabel id="item-unit-select-label">Units</InputLabel>
                <Select
                    labelId="item-unit-select"
                    id="item-unit-select"
                    value={form.unit}
                    label="Age"
                    onChange={(e) => onFormUpdated('unit', e.target.value)}
                >
                    <MenuItem value={'lbs'}>lbs</MenuItem>
                    <MenuItem value={'cups'}>cups</MenuItem>
                    <MenuItem value={'oz'}>oz</MenuItem>
                </Select>
            </FormControl>
        </>
    );
}
