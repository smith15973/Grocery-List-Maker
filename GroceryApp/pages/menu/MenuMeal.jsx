import { Text, View } from 'react-native';

export function MenuMeal({ meal, onSelect, mealsSelected }) {

    const mealSelected = mealsSelected.includes(meal._id);

    return (
        <View style={{backgroundColor:'red', borderRadius: 10, padding: 4, width: 150}} onClick={(e) => onSelect(e)} id={meal._id} key={meal._id} className={`menu-meal-box ${meal.type.toLowerCase()} ${mealSelected ? 'selected' : ''}`}>
            <Text >{meal.main.name} - {meal.type}</Text>
        </View>

    )
}