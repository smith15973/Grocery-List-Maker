import { useState } from "react";
import axios from "axios";
export function NewIngredient({ onIngredientAdded }) {

    const [ingredientForm, setIngredientForm] = useState({
        name: '',
        group: '',
    })

    function handleChange(e) {
        const { name, value } = e.target;
        setIngredientForm({ ...ingredientForm, [name]: value })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/ingredients', ingredientForm)
            setIngredientForm({ name: '', group: '' }) // Clear the form
            onIngredientAdded() // Notify the parent component to reload the ingredients list
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    id='ingredientName'
                    type="text"
                    name='name'
                    placeholder='Name'
                    value={ingredientForm.name}
                    onChange={handleChange}
                    required
                />
                <input
                    id='ingredientGroup'
                    type="text"
                    name='group'
                    placeholder='Food Group'
                    value={ingredientForm.group}
                    onChange={handleChange}
                    required
                />
                <button type='submit'>Create New Ingredient</button>
            </form>
        </>
    )
}