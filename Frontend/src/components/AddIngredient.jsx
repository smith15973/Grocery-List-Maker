import { useEffect, useState } from "react"
import axios from "axios";
export function AddIngredient() {

    const [ingredients, setIngredients] = useState([]);

    async function loadIngredients() {
        const response = await axios.get('http://localhost:3000/ingredients');
        setIngredients(response.data);
    }
    useEffect(() => {
        loadIngredients();
    }, []);

    return (
        <>
            {recipeForm.ingredients.map((ingredient, index) => (
                <div key={index}>
                    <select
                        name="item"
                        value={ingredient.item}
                        onChange={(e) => handleIngredientChange(index, e)}
                    >
                        <option value="">Select:</option>
                        {ingredients.map((ingredientOption) => (
                            <option key={ingredientOption._id} value={ingredientOption._id}>
                                {ingredientOption.name}
                            </option>
                        ))}
                    </select>
                    <input
                        type="number"
                        placeholder="Quantity"
                        name="quantity"
                        value={ingredient.quantity}
                        onChange={(e) => handleIngredientChange(index, e)}
                    />
                    <input
                        type="text"
                        placeholder="Unit"
                        name="unit"
                        value={ingredient.unit}
                        onChange={(e) => handleIngredientChange(index, e)}
                    />
                    <button onClick={(e) => handleRemoveIngredient(index)}>Remove</button>
                </div>
            ))}
        </>
    )
}
