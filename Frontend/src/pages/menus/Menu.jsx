import axios from "axios";
import { useState, useEffect } from "react";
import { AddToMenu } from "./AddToMenu";
import './Menu.css';
import { MenuDay } from "./MenuDay";

export function Menu() {
    const [menus, setMenus] = useState([]);

    async function loadMenus() {
        const response = await axios.get('http://localhost:3000/menus');
        setMenus(response.data);
    }

    useEffect(() => {
        loadMenus();
    }, []);

    async function addToList(e) {
        const menuID = e.target.id.split('-')[1];
        const response = await axios.put(`http://localhost:3000/menus/addToList`, { menuDayID: menuID });
        console.log(response.data)
    }

    return (
        <>
            <h1>MENUS</h1>
            <AddToMenu onMenuUpdated={loadMenus} />

            <div className="calendar">
                {menus.map(menu => {
                    const date = (new Date(menu.date)).toLocaleDateString();

                    function mealSort(a, b) {
                        const order = ['Breakfast', 'Lunch', 'Snack', 'Dinner', 'Dessert'];
                        return order.indexOf(a.type) - order.indexOf(b.type);
                    }

                    const meals = menu.meals.sort(mealSort);
                    return (
                        <div key={menu._id}>
                            <MenuDay date={date} meals={meals} />
                            <button id={`addToList-${menu._id}`} onClick={(e) => { addToList(e) }}>Add to List</button>
                        </div>

                    );
                })}
            </div>
        </>
    );
}
