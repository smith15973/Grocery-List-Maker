// import * as React from 'react';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
import { Button, Modal, Text } from 'react-native';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ListSelect } from './ListSelect';




export default function AddMealsToList({ mealids, onSubmit, disabled }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [addToListForm, setAddToListForm] = useState({
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

    function handleListNameChange(listName) {
        setAddToListForm({ ...addToListForm, listName });
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
        <>
            <Button title="Add to List" disabled={!disabled} variant="text" onPress={handleClickOpen} />

            <Modal
                visible={open}
                onRequestClose={handleClose}
                animationType="slide"
                presentationStyle='formSheet'
            >
                <Text>Add Meals to List</Text>
                <Button title="Close" onPress={handleClose} />
                <ListSelect onListNameChange={handleListNameChange} listName={addToListForm.listName} />
                <Button title="Add to List" onPress={handleAddToListSubmit} />

            </Modal>
        </>
    );
}
