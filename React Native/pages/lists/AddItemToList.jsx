
import axios from 'axios'
import { useState } from 'react'
import { IngredientUnitSelect } from './IngredientUnitSelect'
import { IngredientSelect } from './IngredientSelect'
import { IngredientQuantityInput } from './IngredientQuantityInput'
import { Icon, ListItem } from '@rneui/themed'

export function AddItemToList({ onItemAdded, listId, baseURL }) {


    const [addIngredientForm, setAddIngredientForm] = useState({ item: '', quantity: '', unit: '' })

    async function handleAddIngredient() {
        console.log(addIngredientForm)
        return
        const response = await axios.post(`${baseURL}/${listId}`, { ...addIngredientForm, item: addIngredientForm.item.ingredientId })
        onItemAdded()
        setAddIngredientForm({ item: '', quantity: '', unit: '' })
    }

    function handleChange(name, value) {
        console.log(name, value)
        setAddIngredientForm({ ...addIngredientForm, [name]: value });
    }

    return (
        <ListItem>
            <ListItem.Content style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <IngredientSelect 
                    onAddIngredientFormUpdated={handleChange} 
                    addIngredientForm={addIngredientForm} 
                    style={{ flexGrow: 1, flexShrink: 1, marginRight: 5 }}
                />
    
                <IngredientQuantityInput 
                    onAddIngredientFormUpdated={handleChange} 
                    addIngredientForm={addIngredientForm} 
                    style={{ flexGrow: 0, flexShrink: 1, marginRight: 5, maxWidth: '20%' }}
                />
                <IngredientUnitSelect 
                    onAddIngredientFormUpdated={handleChange} 
                    addIngredientForm={addIngredientForm} 
                    style={{ flexGrow: 0, flexShrink: 1, marginRight: 5, maxWidth: '20%' }}
                />
            </ListItem.Content>
            <Icon
                name='plus-circle'
                type='material-community'
                onPress={handleAddIngredient} />
        </ListItem>
    )
}