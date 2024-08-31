import Dropdown from 'react-native-input-select';
import { useEffect, useState } from "react"
import axios from "axios";
import { Text } from "react-native";


export function IngredientSelect({ onAddIngredientFormUpdated, addIngredientForm }) {

    const [ingredients, setIngredients] = useState([])

    useEffect(() => {
        loadIngredients()
    }, [])

    async function loadIngredients() {
        try {
            const response = await axios.get(`http://localhost:3000/ingredients`)
            setIngredients(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Dropdown
            placeholder="Ingredient"
            options={ingredients.map((ingredient) => ({ label: ingredient.name, value: ingredient._id }))}
            selectedValue={addIngredientForm.item}
            onValueChange={(value) => { onAddIngredientFormUpdated('item', value) }}
            primaryColor={'black'}
            isSearchable
            listHeaderComponent={<Text>Ingredients</Text>}
            dropdownStyle={{ width: '40%', margin: 0 }}
        />
    );
}
