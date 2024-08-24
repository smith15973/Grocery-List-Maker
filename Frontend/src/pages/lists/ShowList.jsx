import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'

import { ListOfItems } from './ListOfItems';

export function ShowList() {
    const routeParams = useParams()

    const [list, setList] = useState({ ingredients: [] })

    useEffect(() => {
        loadList()
    }, [])

    async function loadList() {
        try {
            const response = await axios.get(`http://localhost:3000/lists/${routeParams.id}`)
            setList(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    const ingredientList = list.ingredients.sort((a, b) => {
        return a.complete === b.complete ? 0 : a.complete ? 1 : -1;
    }).map((ingredient) => ingredient);

    return (
        <div>
            <h1>{list.name}</h1>
            <ListOfItems list={ingredientList} listId={list._id} loadList={loadList} />
        </div>




    );
}
