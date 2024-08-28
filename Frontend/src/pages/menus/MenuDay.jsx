import { MenuMeal } from "./MenuMeal";

export function MenuDay({ menuDay, onMealSelect, onSelectDay, mealsSelected }) {

    const mealids = menuDay.meals.map(meal => meal._id);


    const { date, meals } = menuDay;
    const formattedDate = (new Date(date)).toISOString().split('T')[0];

    let daySelected = mealids.every(id => mealsSelected.includes(id));



    return (

        <div className="menu-day-row">
            <h2 onClick={() => onSelectDay(mealids)} className={`menu-date-box ${daySelected ? 'selected' : ''}`}>{formattedDate}</h2>
            {meals.map(meal => (
                <MenuMeal key={meal._id} meal={meal} onSelect={onMealSelect} mealsSelected={mealsSelected} />
            ))}
        </div>

    )
}