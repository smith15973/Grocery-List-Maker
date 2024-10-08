import axios from "axios";
import { useState, useEffect } from "react";
import { AddToMenu } from "./AddToMenu";
import './Menu.css';
import { MenuDay } from "./MenuDay";
import AddMealsToList from "./AddMealsToList";
import { Button, Paper } from "@mui/material";

export function Menu() {
    const [menus, setMenus] = useState([]);

    async function loadMenus() {
        const response = await axios.get('http://localhost:3000/menus');
        setMenus(response.data);
    }

    useEffect(() => {
        loadMenus();
    }, []);



    const [selectMode, setSelectMode] = useState(false);

    const [mealsSelected, setMealsSelected] = useState([]);

    function handleSelectClick() {
        setSelectMode(!selectMode);
        if (selectMode) {
            setMealsSelected([]);
        }
    }



    function handleMealSelect(e) {
        if (!selectMode) return;
        const mealid = e.target.id
        if (mealsSelected.includes(mealid)) {
            setMealsSelected(mealsSelected.filter(id => id !== mealid));
        } else {
            setMealsSelected([...mealsSelected, mealid]);
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

    return (
        <>
            <Paper square sx={{ pb: '50px' }}>
                <div style={{ display: "inline-flex", justifyContent: "between", alignItems: "end" }}>
                    <AddMealsToList disabled={selectMode && mealsSelected.length} mealids={mealsSelected} onSubmit={clearSelected} />
                    <Button variant="text" onClick={handleSelectClick}>{selectMode ? 'Cancel' : 'Select'}</Button>
                </div>
            </Paper>


            <h3>Menu</h3>
            <AddToMenu onMenuUpdated={loadMenus} />

            <div className="menu">
                {menus.map(menu => {
                    function mealSort(a, b) {
                        const order = ['Breakfast', 'Lunch', 'Snack', 'Dinner', 'Dessert'];
                        return order.indexOf(a.type) - order.indexOf(b.type);
                    }

                    const meals = menu.meals.sort(mealSort);
                    return (

                        <div key={menu._id}>
                            <MenuDay menuDay={menu} onMealSelect={handleMealSelect} onSelectDay={handleSelectDay} mealsSelected={mealsSelected} />

                        </div>


                    );
                })}
            </div>
        </>
    );
}
