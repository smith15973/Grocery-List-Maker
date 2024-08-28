export function MenuMeal({ meal, onSelect, mealsSelected }) {

    const mealSelected = mealsSelected.includes(meal._id);

    return (
        <div onClick={(e) => onSelect(e)} id={meal._id} key={meal._id} className={`menu-meal-box ${meal.type.toLowerCase()} ${mealSelected ? 'selected' : ''}`}>
            <h3><a href={`#/recipes/${meal.main._id}`}>{meal.main.name}</a> {meal.type}</h3>
        </div>

    )
}