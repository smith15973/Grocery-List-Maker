import { Text, TouchableOpacity } from 'react-native';
import styles from '../../styles';

export function MenuMeal({ meal, onSelect, mealsSelected }) {

    const mealSelected = mealsSelected.includes(meal._id);

    return (
        <TouchableOpacity
            style={mealSelected ? styles.mealSelected : styles.meal}
            onPress={() => onSelect(meal._id)} key={meal._id}
        >
            <Text >{meal.main.name} - {meal.type}</Text>
        </TouchableOpacity>

    )
}

