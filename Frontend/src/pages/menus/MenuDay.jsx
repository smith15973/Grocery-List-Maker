export function MenuDay({date, meals}) {

    return (

        <div className="calendar-cell">
            <h2 className="calendar-date">{date}</h2>
            {meals.map(meal => (
                <div key={meal._id} className="calendar-meal">
                    <h3>{meal.main.name} ({meal.type})</h3>
                </div>
            ))}
        </div>

    )
}