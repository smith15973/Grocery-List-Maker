export function Ingredient({ ingredient }) {

    return (
        <li><b>Name: </b>{ingredient.name}, <b>Group:</b> {ingredient.group}</li>
    )
}