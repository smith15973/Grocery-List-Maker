import { useEffect, useState } from "react"
import axios from "axios";
import { Button, List, ListItem, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function Lists() {

    const navigate = useNavigate();


    const [lists, setLists] = useState([])

    async function loadLists() {
        const response = await axios.get('http://localhost:3000/lists')
        setLists(response.data);
    }

    useEffect(() => { loadLists() }, [])

    return (
        <>
            <h3>Lists</h3>
            <Button variant="outlined">Create New List</Button>
            <List sx={{ width: '100%', maxWidth: '100%' }}>
                {lists.map(list => {
                    return (
                        // <ListItem
                        //     key={list._id}
                        //     secondaryAction={
                        //         <IconButton edge="end" aria-label="delete" onClick={() => { handleDelete(list._id) }}>
                        //             <TrashIcon />
                        //         </IconButton>
                        //     }
                        //     disablePadding
                        // >
                        //     <ListItemButton role={undefined} dense>
                        //         {ingredient.complete !== undefined ? <ListItemIcon>
                        //             <Checkbox
                        //                 edge="start"
                        //                 checked={ingredient.complete}
                        //                 tabIndex={-1}
                        //                 disableRipple
                        //                 inputProps={{ 'aria-labelledby': labelId }}
                        //                 onClick={handleToggle(ingredient._id)}
                        //             />
                        //         </ListItemIcon> : ''}
                        //         <ListItemText id={labelId} primary={`${ingredient.item.name} ${ingredient.quantity ? `--- ${ingredient.quantity} ${ingredient.unit}` : ''}`} />
                        //     </ListItemButton>
                        // </ListItem>
                        <ListItem onClick={() => { navigate(`/Lists/${list._id}`) }} key={list._id}>
                            <ListItemText href={`#/Lists/${list._id}`}>{list.name}</ListItemText>
                        </ListItem>
                    )
                })}
            </List>
        </>
    )
}
