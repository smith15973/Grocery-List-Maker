import axios from "axios";
import { useState, useEffect } from "react";
import { MenuDay } from "./MenuDay";
import AddMealsToList from "./AddMealsToList";
import { View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export function Menu() {
    const navigation = useNavigation();
    const [menus, setMenus] = useState([]);


    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date(new Date().setDate(new Date().getDate() + 20)));
    
    

    function generateDateRange() {
        
        const days = [];
        let currentDate = new Date(startDate);
        
        while (currentDate <= endDate) {
            days.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return days;
    }
    



    async function loadMenus() {
        const response = await axios.get('http://localhost:3000/menus', 
        {
            params: {
                startDate: startDate,
                endDate: endDate,
            }
        }
        );
        const menuData = response.data;
        const allDates = generateDateRange();
        setMenus(response.data);
    }

    useEffect(() => {
        loadMenus();
        generateDateRange();
    }, []);



    const [selectMode, setSelectMode] = useState(false);

    const [mealsSelected, setMealsSelected] = useState([]);

    function handleSelectClick() {
        setSelectMode(!selectMode);
        if (selectMode) {
            setMealsSelected([]);
        }
    }



    function handleMealSelect(mealId) {
        if (!selectMode) return;
        if (mealsSelected.includes(mealId)) {
            setMealsSelected(mealsSelected.filter(id => id !== mealId));
        } else {
            setMealsSelected([...mealsSelected, mealId]);
        }
    }

    const handleSelectDay = (ids) => {
        if (!selectMode) return;
        if (ids.every(id => mealsSelected.includes(id))) { // if all meals are selected, deselect them
            setMealsSelected(mealsSelected.filter(id => !ids.includes(id)));
        } else {
            const newIds = ids.filter(id => !mealsSelected.includes(id)); // only add the ids that are not already selected
            setMealsSelected([...mealsSelected, ...newIds]);
        }
    }

    function clearSelected() {
        setSelectMode(false);
        setMealsSelected([]);
    }

    navigation.setOptions({
        headerRight: () => selectMode ? <AddMealsToList disabled={selectMode && mealsSelected.length} mealids={mealsSelected} onSubmit={clearSelected} /> : <Button title="+" onPress={() => navigation.navigate('Add to Menu')} />,

        headerLeft: () => <Button title={selectMode ? "Cancel" : "Select"}
            onPress={handleSelectClick}
        />
    });

    return (

        <View className="menu">
            {menus.map(menuDay => {
                function mealSort(a, b) {
                    const order = ['Breakfast', 'Lunch', 'Snack', 'Dinner', 'Dessert'];
                    return order.indexOf(a.type) - order.indexOf(b.type);
                }

                // const meals = menuDay.meals.sort(mealSort);
                return (

                    <View key={menuDay._id}>
                        <MenuDay menuDay={menuDay} onMealSelect={handleMealSelect} onSelectDay={handleSelectDay} mealsSelected={mealsSelected} />
                    </View>


                );
            })}
        </View>

    );
}
