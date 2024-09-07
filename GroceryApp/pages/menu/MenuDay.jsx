import { ScrollView, Text } from "react-native";
import { View } from "react-native";
import { MenuMeal } from "./MenuMeal";

export function MenuDay({ menuDay, onMealSelect, onSelectDay, mealsSelected }) {

    const mealids = menuDay.meals.map(meal => meal._id);


    const { date, meals } = menuDay;
    // const formattedDate = (new Date(date)).toISOString().split('T')[0];
    const formattedDate = (new Date(date)).toUTCString().split(' ').slice(0, 4).join(' ');

    let daySelected = mealids.every(id => mealsSelected.includes(id));



    return (

        <View className="menu-day-row">
            <View style={{ width: '20%', height: 200, backgroundColor: 'green', borderRadius: 10, padding: 5, flexDirection: "row" }} onClick={() => onSelectDay(mealids)} className={`menu-date-box ${daySelected ? 'selected' : ''}`}><Text>{formattedDate}</Text></View>

            <ScrollView horizontal style={{ flexDirection: "row" }}>
                {meals.map(meal => (
                    <MenuMeal key={meal._id} meal={meal} onSelect={onMealSelect} mealsSelected={mealsSelected} />
                ))}
            </ScrollView>
        </View>

    )
}