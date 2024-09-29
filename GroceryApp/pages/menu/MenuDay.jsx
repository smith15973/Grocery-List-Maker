import { ScrollView, Text, Touchable, TouchableHighlight, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { MenuMeal } from "./MenuMeal";

export function MenuDay({ menuDay, onMealSelect, onSelectDay, mealsSelected }) {

    const mealids = menuDay.meals.map(meal => meal._id);


    const { date, meals } = menuDay;

    const formattedDate = (new Date(date)).toUTCString().split(' ').slice(0, 4).join(' ');

    let daySelected = mealids.every(id => mealsSelected.includes(id));



    return (

        <View className="menu-day-row">
            <TouchableOpacity style={{ width: '20%', height: 200, backgroundColor: 'green', borderRadius: 10, padding: 5, flexDirection: "row" }} onPress={() => onSelectDay(mealids)} className={`menu-date-box ${daySelected ? 'selected' : ''}`} onLongPress={() => console.log(`LONG PRESS DATE: ${date}`)}><Text>{formattedDate}</Text></TouchableOpacity>

            <ScrollView horizontal style={{ flexDirection: "row" }}>
                {meals.map(meal => (
                    <MenuMeal key={meal._id} meal={meal} onSelect={onMealSelect} mealsSelected={mealsSelected} />
                ))}
            </ScrollView>
        </View>

    )
}