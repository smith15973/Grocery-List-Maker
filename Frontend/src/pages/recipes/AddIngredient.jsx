export function AddIngredient({ ingredients, recipeIngredients, onIngredientChange, onRemoveIngredient, onAddIngredient }) {

    return (
        <>
            {recipeIngredients.map((ingredient, index) => (
                <div key={index}>
                    <select
                        name="item"
                        value={ingredient.item}
                        onChange={(e) => onIngredientChange(index, e)}
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
                        onChange={(e) => onIngredientChange(index, e)}
                    />
                    <input
                        type="text"
                        placeholder="Unit"
                        name="unit"
                        value={ingredient.unit}
                        onChange={(e) => onIngredientChange(index, e)}
                    />
                    <button onClick={() => onRemoveIngredient(index)}>Remove</button>
                </div>
            ))}
            <button type="button" onClick={onAddIngredient}>Add Ingredient</button>

        </>
    );
}
