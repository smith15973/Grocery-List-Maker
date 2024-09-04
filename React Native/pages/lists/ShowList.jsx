import axios from 'axios'
import { useEffect, useState } from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { ListOfItems } from './ListOfItems';

export function ShowList({ route }) {

    const [list, setList] = useState({ ingredients: [] })

    useEffect(() => {
        loadList()
    }, [])

    async function loadList() {
        try {
            const response = await axios.get(`http://localhost:3000/lists/${route.params.id}`)
            setList(response.data)
        } catch (e) {
            console.log(e)
        }
    }


    const ingredientList = list.ingredients.sort((a, b) => {
        return a.complete === b.complete ? 0 : a.complete ? 1 : -1;
    }).map((ingredient) => ingredient);

    return (
        <SafeAreaView>
            <Text>Name {list.name}</Text>
            <ListOfItems list={ingredientList} listId={list._id} loadList={loadList} baseURL="http://localhost:3000/lists" />
        </SafeAreaView>




    );
}
