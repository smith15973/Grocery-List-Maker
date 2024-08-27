import { useNavigate } from "react-router-dom"

export function MenuDay({ date, meals }) {

    const navigate = useNavigate();

    return (

        <div className="menu-day-row">
            <h2 className="menu-date-box">{date}</h2>
            {meals.map(meal => (
                <div key={meal._id} className={`menu-meal-box ${meal.type.toLowerCase()}`} onClick={() => { navigate(`/recipes/${meal.main._id}`) }}>
                    <h3>{meal.main.name} {meal.type}</h3>
                </div>
            ))}
        </div>

    )
}