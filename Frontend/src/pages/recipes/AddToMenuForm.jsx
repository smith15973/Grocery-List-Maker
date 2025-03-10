import { useState } from "react";
import axios from "axios";
import {
    Button,
    Modal,
    Box,
    TextField,
    IconButton,
    Typography,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

// Modal style
const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

// Form container style
const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: 2,
};

// Button container style
const buttonContainerStyle = {
    mt: 3,
    display: "flex",
    justifyContent: "flex-end",
    gap: 2,
};

// Meal type options
const mealTypes = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Snack",
    "Dessert",
];

export function AddToMenuForm({ recipeID }) {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        date: "",
        main: recipeID,
        type: "",
    });

    const handleOpen = (e) => {
        e.stopPropagation();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            await axios.post("http://localhost:3000/menus", formData);
            setFormData({
                date: "",
                main: recipeID,
                type: "",
            });
            handleClose();
        } catch (error) {
            console.error("Error adding to menu:", error);
        }
    };

    return (
        <>
            <IconButton
                onClick={handleOpen}
                color="primary"
                aria-label="add to menu"
                sx={{
                    "&:hover": {
                        bgcolor: "primary.light",
                    },
                }}
            >
                <AddIcon />
            </IconButton>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="add-to-menu-title"
                aria-describedby="add-to-menu-description"
            >
                <Box sx={modalStyle}>
                    <Typography
                        id="add-to-menu-title"
                        variant="h6"
                        component="h2"
                        sx={{ mb: 2 }}
                    >
                        Add Recipe to Menu
                    </Typography>

                    <form onSubmit={handleSubmit} style={formStyle}>
                        <TextField
                            label="Date"
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <FormControl required>
                            <InputLabel id="meal-type-label">Meal Type</InputLabel>
                            <Select
                                labelId="meal-type-label"
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                label="Meal Type"
                            >
                                <MenuItem value="">
                                    <em>Select meal type</em>
                                </MenuItem>
                                {mealTypes.map((type) => (
                                    <MenuItem key={type} value={type}>
                                        {type}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Box sx={buttonContainerStyle}>
                            <Button
                                onClick={handleClose}
                                variant="outlined"
                                color="primary"
                                sx={{ minWidth: 100 }}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                sx={{ minWidth: 100 }}
                            >
                                Add
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Modal>
        </>
    );
}