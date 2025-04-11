import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'

import { ListOfItems } from './ListOfItems';
import { Typography } from '@mui/material';

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

    const ingredientList = list.ingredients;
    // const ingredientList = list.ingredients.sort((a, b) => {
    //     return a.complete === b.complete ? 0 : a.complete ? 1 : -1;
    // }).map((ingredient) => ingredient);

    return (
        <div style={{paddingBottom: '5%'}}>
            <Typography variant='h4' align='center'>{list.name}</Typography>
            <ListOfItems list={ingredientList} listId={list._id} loadList={loadList} baseURL="http://localhost:3000/lists" />
        </div>




    );
}
