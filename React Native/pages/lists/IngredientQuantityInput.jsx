import { View, TextInput, Alert, StyleSheet } from 'react-native';


export function IngredientQuantityInput({ onAddIngredientFormUpdated, addIngredientForm, style }) {


    function handleChange(text) {
        let newText = '';
        let numbers = '0123456789.';

        for (var i = 0; i < text.length; i++) {
            if (numbers.indexOf(text[i]) > -1) {
                newText = newText + text[i];
            }
            else {
                // your call back function
                // Alert("please enter numbers only");
            }
        }

        newText = parseFloat(newText);
        if (isNaN(newText) || newText < 0) {
            newText = '';
        }
        console.log(newText);
        onAddIngredientFormUpdated('quantity', newText);
    }


    return (

        <TextInput
            editable
            value={addIngredientForm.quantity}
            onChangeText={(text) => handleChange(text)}
            placeholder='Qty'
            placeholderTextColor={'black'}
            inputMode='number'
            maxLength={4}
            style={style}
        />

    );
}
