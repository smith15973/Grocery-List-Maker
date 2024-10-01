import axios from "axios";
import { useState, useEffect } from "react";
import { MenuDay } from "./MenuDay";
import AddMealsToList from "./AddMealsToList";
import { Button } from "react-native";
import { FlatList } from "react-native-bidirectional-infinite-scroll";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";
import { AddToMenu } from "./AddToMenu";

export function Menu() {
    const ITEM_HEIGHT = 110;
    const WINDOW_HEIGHT = Dimensions.get('window').height;
    const LOAD_SCREEN_OF_ITEMS = Math.ceil(WINDOW_HEIGHT / ITEM_HEIGHT) + 1;
    const navigation = useNavigation();
    const [menus, setMenus] = useState([]);


    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [selectMode, setSelectMode] = useState(false);
    const [mealsSelected, setMealsSelected] = useState([]);



    function generateDaysRange(startDate, endDate) {

        const days = [];
        let currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            days.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return days;
    }




    async function loadMenusInRange(startDate, endDate) {
        try {
            const response = await axios.get('http://localhost:3000/menus',
                {
                    params: {
                        startDate: startDate,
                        endDate: endDate,
                    }
                },
            );
            const menuData = response.data;
            const allDays = generateDaysRange(startDate, endDate);


            menuData.forEach(menuDay => {
                // console.log(new Date(menuDay.date).toDateString());
            })
            const mergedData = allDays.map(day => {
                // console.log(day.toDateString());
                
                const menuDay = menuData.find(menuDay => new Date(menuDay.date).setHours(0,0,0,0) === day.setHours(0,0,0,0));
                console.log(menuDay || { date: day, meals: [] });
                return menuDay || { date: day, meals: [] };
            })

            setMenus(mergedData);
        } catch (err) {
            console.log(err);
        }
    }

    async function loadOlderMenuDays() {
        const newStartDate = new Date(startDate);
        newStartDate.setDate(startDate.getDate() - LOAD_SCREEN_OF_ITEMS);
        setStartDate(newStartDate);
        loadMenusInRange(newStartDate, endDate);
    }

    async function loadNewerMenuDays() {
        const newEndDate = new Date(endDate);
        newEndDate.setDate(endDate.getDate() + LOAD_SCREEN_OF_ITEMS);
        setEndDate(newEndDate);
        loadMenusInRange(startDate, newEndDate);
    }

    useEffect(() => {
        const oneDayBeforeStartDate = new Date(startDate);
        oneDayBeforeStartDate.setDate(startDate.getDate() - 1);
        setStartDate(oneDayBeforeStartDate);
        const initialEndDate = new Date();
        initialEndDate.setDate(startDate.getDate() + LOAD_SCREEN_OF_ITEMS);
        setEndDate(initialEndDate);
        loadMenusInRange(oneDayBeforeStartDate, initialEndDate);
    }, []);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => selectMode ? <AddMealsToList disabled={selectMode && mealsSelected.length} mealids={mealsSelected} onSubmit={clearSelected} /> : <AddToMenu onMenuUpdated={handleMenuChange} />,

            headerLeft: () => <Button title={selectMode ? "Cancel" : "Select"}
                onPress={handleSelectClick}
            />
        });
    }, [[navigation, selectMode, mealsSelected]])


    function handleMenuChange() {
        loadMenusInRange(startDate, endDate);
    }


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




    <Button title="+" onPress={() => navigation.navigate('Add to Menu')} />



    return (
        <FlatList
            data={menus}
            renderItem={({ item }) => (
                <MenuDay menuDay={item} handleMenuChange={handleMenuChange} onMealSelect={handleMealSelect} onSelectDay={handleSelectDay} mealsSelected={mealsSelected} />
            )}
            onEndReached={loadNewerMenuDays}
            onEndReachedThreshold={0.8}

            onStartReached={loadOlderMenuDays}
            onStartReachedThreshold={0.3}
            showDefaultLoadingIndicators={true}
            getItemLayout={(data, index) => (
                { length: 110, offset: 110 * index, index }
            )}
            keyExtractor={(item) => item.date}
            initialScrollIndex={1}

        />

    );
}
