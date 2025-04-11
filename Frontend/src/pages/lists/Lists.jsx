import { useEffect, useState } from "react"
import axios from "axios";
import { Button, Container, List, ListItem, ListItemText, Typography} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ListItemButton from '@mui/material/ListItemButton';
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";



export function Lists() {

    const navigate = useNavigate();


    const [lists, setLists] = useState([])

    async function loadLists() {
        const response = await axios.get('http://localhost:3000/lists')
        setLists(response.data);
    }

    const handleDelete = async (listId) => {
        const response = await axios.delete(`http://localhost:3000/lists/${listId}`)
        loadLists()
    }

    useEffect(() => { loadLists() }, [])

    return (
        <Container>
            <Typography variant='h4' align='center'>Lists</Typography>
            <Button variant="outlined">Create New List</Button>
            <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
                {lists.map(list => {
                    return (
                        <ListItem key={list._id}
                            secondaryAction={
                                <ConfirmDeleteModal
                                    onConfirm={() => { handleDelete(list._id) }}
                                    title={`Delete ${list.name}`}
                                    message="Are you sure you want to delete this list?"
                                />
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
        </Container>
    )
}
