import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import TrashIcon from '@mui/icons-material/Delete';
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { AddItemToList } from './AddItemToList';

export function ListMaterial() {
    const routeParams = useParams()


    const handleToggle = (ingredientId) => async () => {
        const response = await axios.put(`http://localhost:3000/lists/${routeParams.id}/toggleCheck`, { ingredientId })
        setList(response.data)
    };



    const [list, setList] = useState({ ingredients: [] })

    useEffect(() => {
        loadList()
    }, [])

    async function loadList() {
        try {
            const response = await axios.get(`http://localhost:3000/lists/${routeParams.id}`)
            setList(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    const handleDelete = async (ingredientId) => {
        const response = await axios.delete(`http://localhost:3000/lists/${routeParams.id}/${ingredientId}`)
        setList(response.data)
    }



    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {list.ingredients.sort((a, b) => {
                return a.complete === b.complete ? 0 : a.complete ? 1 : -1;
            }).map((ingredient) => {
                const labelId = `checkbox-list-label-${ingredient._id}`;

                return (
                    <ListItem
                        key={ingredient._id}
                        secondaryAction={
                            <IconButton edge="end" aria-label="delete" onClick={() => { handleDelete(ingredient._id) }}>
                                <TrashIcon />
                            </IconButton>
                        }
                        disablePadding
                    >
                        <ListItemButton role={undefined} onClick={handleToggle(ingredient._id)} dense>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={ingredient.complete}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`${ingredient.item.name} --- ${ingredient.quantity} ${ingredient.unit}`} />
                        </ListItemButton>
                    </ListItem>
                );
            })}

            <AddItemToList onItemAdded={loadList} listId={routeParams.id} />

        </List>



    );
}
