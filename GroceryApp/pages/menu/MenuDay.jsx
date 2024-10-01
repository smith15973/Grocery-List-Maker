import { ScrollView, Text, Touchable, TouchableHighlight, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { MenuMeal } from "./MenuMeal";
import styles from "../../styles";

export function MenuDay({ menuDay, onMealSelect, onSelectDay, mealsSelected, handleMenuChange }) {

    const mealids = menuDay.meals.map(meal => meal._id);


    const { date, meals } = menuDay;

    const formattedDate = (new Date(date)).toUTCString().split(' ').slice(0, 4).join(' ');

    let daySelected = mealids.every(id => mealsSelected.includes(id));

    function mealSort(a, b) {
        const order = ['Breakfast', 'Lunch', 'Snack', 'Dinner', 'Dessert'];
        return order.indexOf(a.type) - order.indexOf(b.type);
    }

    

    return (

        <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
                style={daySelected && meals.length ? styles.menuDaySelected : styles.menuDay}
                onPress={() => onSelectDay(mealids)}
                className={`menu-date-box ${daySelected ? 'selected' : ''}`}
            >
                <Text>{formattedDate}</Text>
            </TouchableOpacity>

            <ScrollView horizontal style={{ flexDirection: "row" }}>
                {meals.sort(mealSort).map(meal => (
                    <MenuMeal handleMenuChange={handleMenuChange} key={meal._id} meal={meal} onSelect={onMealSelect} mealsSelected={mealsSelected} menuId={menuDay._id} />
                ))}
            </ScrollView>
        </View>

    )
}