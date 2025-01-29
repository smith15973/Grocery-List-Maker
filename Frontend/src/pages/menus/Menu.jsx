import axios from "axios";
import { useState, useEffect } from "react";
import { AddToMenu } from "./AddToMenu";
import './Menu.css';
import { MenuDay } from "./MenuDay";
import AddMealsToList from "./AddMealsToList";
import { Button, Paper } from "@mui/material";
import dayjs from "dayjs"


export function Menu() {
    const [menus, setMenus] = useState([]);

    const [monthYear, setMonthYearnew] = useState({ month: dayjs().month(), year: dayjs().year() })

    function getNumberOfDaysInMonth(month, year) {
        return dayjs(`${year}-${month}-01`).daysInMonth();
    }

    async function loadMenus() {
        // const response = await axios.get('http://localhost:3000/menus');
        // setMenus(response.data);
    }

    useEffect(() => {
        loadMenus();
        console.log(monthYear)
        console.log(getNumberOfDaysInMonth(monthYear.month, monthYear.year))
    }, []);

    const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];



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
            <div style={{width: '40%', margin: '0 auto'}}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px'}}>
                    {Array.from({ length: daysOfWeek.length }, (_, i) => (
                        <div style={{ border: '1px solid black', paddingTop: '100%', position: 'relative' }} key={i + 1}>
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                                <div>{daysOfWeek[i]}</div>
                            </div>
                        </div>
                    ))}
                    {Array.from({ length: getNumberOfDaysInMonth(monthYear.month, monthYear.year) }, (_, i) => (
                        <div style={{ border: '1px solid black', paddingTop: '100%', position: 'relative' }} key={i + 1}>
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: '70%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                                {i + 1}  {dayjs().day()}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* <Paper square sx={{ pb: '50px' }}>
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
            </div> */}
        </>
    );
}
