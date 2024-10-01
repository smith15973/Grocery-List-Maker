import { ActionSheetIOS, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import styles from '../../styles';

export function MenuMeal({ meal, onSelect, mealsSelected, handleMenuChange, menuId }) {

    const mealSelected = mealsSelected.includes(meal._id);

    async function handleDelete() {
        console.log('delete', meal._id, menuId);
        await axios.delete(`http://localhost:3000/menus/${menuId}/${meal._id}`);
        handleMenuChange();
    }

    function handleLongPress() {
        ActionSheetIOS.showActionSheetWithOptions({
            options: ['Delete', 'Cancel'],
            destructiveButtonIndex: 0,
            cancelButtonIndex: 1,
        },
            (buttonIndex) => {
                if (buttonIndex === 0) {
                    handleDelete();
                }
            });
    }


    return (
        <TouchableOpacity
            style={mealSelected ? styles.mealSelected : styles.meal}
            onPress={() => onSelect(meal._id)}
            onLongPress={handleLongPress}

        >
            <Text >{meal.main.name} - {meal.type}</Text>
        </TouchableOpacity>

    )
}

