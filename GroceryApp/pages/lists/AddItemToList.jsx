
import axios from 'axios'
import { useState } from 'react'
import { IngredientUnitSelect } from './IngredientUnitSelect'
import { IngredientSelect } from './IngredientSelect'
import { IngredientQuantityInput } from './IngredientQuantityInput'
import { ListItem } from '@rneui/themed'
import Icon from 'react-native-vector-icons/FontAwesome';



export function AddItemToList({ onItemAdded, listId, baseURL }) {


    const [addIngredientForm, setAddIngredientForm] = useState({ item: '', quantity: '', unit: '' })

    async function handleAddIngredient() {
        if (baseURL) {
            const response = await axios.post(`${baseURL}/${listId}`, addIngredientForm)
        }
        onItemAdded()
        setAddIngredientForm({ item: '', quantity: '', unit: '' })
    }

    function handleChange(name, value) {
        console.log(name, value)
        setAddIngredientForm({ ...addIngredientForm, [name]: value });
    }

    return (
        <ListItem bottomDivider>

            <ListItem.Content style={{ width: '100%', flexDirection: 'row', alignItems: 'top', height: 64 }}>

                <IngredientSelect
                    onAddIngredientFormUpdated={handleChange}
                    addIngredientForm={addIngredientForm}
                    style={{ width: '40%' }}
                />
                <IngredientQuantityInput
                    onAddIngredientFormUpdated={handleChange}
                    addIngredientForm={addIngredientForm}
                    style={{
                        backgroundColor: '#F7F7F7',
                        marginLeft: 0,
                        borderWidth: 1,
                        borderColor: 'black',
                        borderRadius: 8,
                        padding: 23,
                        width: '25%',
                    }}
                />
                <IngredientUnitSelect
                    onAddIngredientFormUpdated={handleChange}
                    addIngredientForm={addIngredientForm}
                    style={{ width: '35%' }}
                />
            </ListItem.Content>

            <Icon
                name='plus'
                type='material-community'
                size={20}
                onPress={handleAddIngredient} />
        </ListItem>
    )
}