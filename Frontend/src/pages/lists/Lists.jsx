import { useEffect, useState } from "react"
import axios from "axios";
import { Button, List, ListItem, ListItemText, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ListItemButton from '@mui/material/ListItemButton';

import TrashIcon from '@mui/icons-material/Delete';

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
            <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
                {lists.map(list => {
                    return (
                        <ListItem key={list._id}
                            secondaryAction={
                                <IconButton edge="end" aria-label="delete" onClick={() => { handleDelete(list._id) }}>
                                    <TrashIcon />
                                </IconButton>
                            }
                            disablePadding
                        >
                            <ListItemButton role={undefined} onClick={() => { navigate(`/lists/${list._id}`) }} dense>
                                <ListItemText >{list.name}</ListItemText>
                            </ListItemButton>
                        </ListItem>
                    )
                })}
            </List>
        </>
    )
}
