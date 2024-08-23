import { useState } from "react";
import axios from "axios";

export function AddToMenuForm({ recipeID }) {
    const [addToMenuForm, setAddToMenuForm] = useState({
        date: '',
        main: recipeID,
        type: '',
    })

    function handleChange(e) {
        const { name, value } = e.target;
        setAddToMenuForm({ ...addToMenuForm, [name]: value });
    }

    async function addToMenu(e) {
        e.preventDefault()
        await axios.post('http://localhost:3000/menus', addToMenuForm);
        setAddToMenuForm({
            date: '',
            main: recipeID,
            type: '',
        });
    }

    return (
        <form onSubmit={addToMenu}>
            <input onChange={handleChange} value={addToMenuForm.date} name="date" type="date" required />
            <input onChange={handleChange} value={addToMenuForm.type} name="type" type="text" required />
            <button type="submit">Add to Menu</button>
        </form>
    )
}