import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function ItemQuantityInput({ onFormUpdated, form }) {

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
                value={form.quantity}
                onChange={(e) => onFormUpdated('quantity', e.target.value)}
            />
        </Box>
    );
}
