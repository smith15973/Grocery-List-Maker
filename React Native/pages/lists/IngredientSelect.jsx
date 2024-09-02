import Dropdown from 'react-native-input-select';
import { useEffect, useState } from "react"
import axios from "axios";
import { Text, View, Pressable } from "react-native";


export function IngredientSelect({ onAddIngredientFormUpdated, addIngredientForm }) {

    const [searchTerm, setSearchTerm] = useState('');
    const [ingredientOptions, setIngredientOptions] = useState([])

    useEffect(() => {
        loadIngredients()
    }, [])

    async function loadIngredients() {
        try {
            const response = await axios.get(`http://localhost:3000/ingredients`)
            setIngredientOptions(response.data.map(ingredient => ({ label: ingredient.name, value: ingredient._id })))
        } catch (e) {
            console.log(e)
        }
    }

    return (

        <Dropdown
            label="Ingredient"
            placeholder="Select or add ingredients..."
            options={ingredientOptions}
            selectedValue={addIngredientForm.item}
            onValueChange={(value) => { onAddIngredientFormUpdated('item', value) }}
            isSearchable
            primaryColor={'deepskyblue'}
            listEmptyComponent={
                <View
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingVertical: 10,
                    }}>
                    <Pressable
                        onPress={() => {
                            onAddIngredientFormUpdated('item', searchTerm)
                            setIngredientOptions([
                                ...ingredientOptions,
                                { label: searchTerm, value: searchTerm },
                            ]);

                        }}
                        style={{
                            backgroundColor: 'red',
                            borderRadius: 5,
                            width: 120,
                            padding: 5,
                        }}>
                        <Text style={{ color: 'white', textAlign: 'center' }}>
                            Add ingredient
                        </Text>
                    </Pressable>
                </View>
            }
            searchControls={{ searchCallback: value => { setSearchTerm(value) } }}
        />
    );
}
