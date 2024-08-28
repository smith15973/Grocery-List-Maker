import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ListSelect from './ListSelect';
import axios from 'axios';
import { useEffect } from 'react';

export default function AddMealsToList({ mealids, onSubmit }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [addToListForm, setAddToListForm] = React.useState({
        listName: '',
        mealids,
    });

    // Update mealids in the form whenever it changes
    useEffect(() => {
        setAddToListForm(prevForm => ({
            ...prevForm,
            mealids
        }));
    }, [mealids]);

    function handleListNameChange(e) {
        setAddToListForm({ ...addToListForm, listName: e.target.value });
    }

    async function handleAddToListSubmit() {
        console.log(addToListForm);
        if (addToListForm.listName === '' || addToListForm.mealids.length === 0) {
            console.log('List name and meals selected are required');
            return;
        }
        const response = await axios.put(`http://localhost:3000/menus/addToList`, addToListForm);
        console.log(response.data);
        setAddToListForm({ listName: '', mealids });
        handleClose();
        onSubmit();
    }

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Meals to List
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Add Meals to List</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter the the list you would like to add these meals to or enter new name to create a new list create a new list.
                    </DialogContentText>
                    <ListSelect onListNameChange={handleListNameChange} listName={addToListForm.listName} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" onClick={handleAddToListSubmit}>Add to List</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
