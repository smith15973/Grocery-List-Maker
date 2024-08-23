import { useEffect, useState } from "react"
import axios from "axios";
export function Lists() {

    const [lists, setLists] = useState([])

    async function loadLists() {
        const response = await axios.get('http://localhost:3000/lists')
        setLists(response.data);
    }

    useEffect(() => { loadLists() }, [])

    return (
        <>
            <h3>Lists</h3>
            <button>Create New List</button>
            <ul>
                {lists.map(list => {
                    return (
                        <li key={list._id}><a href={`#/Lists/${list._id}`}>{list.name}</a></li>
                    )
                })}
            </ul>
        </>
    )
}
