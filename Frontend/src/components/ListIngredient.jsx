
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import TrashIcon from '@mui/icons-material/Delete';
import axios from 'axios'
import ConfirmDeleteModal from './ConfirmDeleteModal';

export function ListIngredient({ ingredient, listId, onListUpdated, baseURL }) {
    const labelId = `checkbox-list-label-${ingredient._id}`;

    const handleToggle = (ingredientId) => async () => {
        const response = await axios.put(`${baseURL}/${listId}/toggleCheck`, { ingredientId })
        onListUpdated()
    };


    const handleDelete = async (ingredientId) => {
        const response = await axios.delete(`${baseURL}/${listId}/${ingredientId}`)
        onListUpdated()
    }



    return (

        <ListItem
            key={ingredient._id}
            secondaryAction={
                <ConfirmDeleteModal 
                    onConfirm={() => { handleDelete(ingredient._id) }}
                    title={`Delete ${ingredient.item.name}`}
                    message={`Are you sure you want to delete ${ingredient.item.name} from the list?`}
                />
            }
            disablePadding
        >
            <ListItemButton role={undefined} dense>
                {ingredient.complete !== undefined ? <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={ingredient.complete}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                        onClick={handleToggle(ingredient._id)}
                    />
                </ListItemIcon> : ''}
                <ListItemText id={labelId} primary={`${ingredient.item.name} ${ingredient.quantity ? `--- ${ingredient.quantity} ${ingredient.unit}` : ''}`} />
            </ListItemButton>
        </ListItem>
    );
}
