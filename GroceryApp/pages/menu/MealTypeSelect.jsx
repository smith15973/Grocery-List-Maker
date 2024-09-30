import Dropdown from 'react-native-input-select';
import { useEffect, useState } from "react"
import axios from "axios";
import { Text, View, Pressable } from "react-native";


export function MealTypeSelect({ name, onMealTypeChange, mealType }) {

    return (
        <View>
            <Dropdown
                dropdownStyle={{ minHeight: 65 }}
                placeholder="Select Type of Meal"
                options={[
                    { label: 'Breakfast', value: 'Breakfast' },
                    { label: 'Lunch', value: 'Lunch' },
                    { label: 'Dinner', value: 'Dinner' },
                    { label: 'Snack', value: 'Snack' },
                    { label: 'Dessert', value: 'Dessert' },
                ]}
                selectedValue={mealType}
                onValueChange={(value) => { onMealTypeChange(name, value) }}
                primaryColor={'deepskyblue'}
            />
        </View>
    );
}
