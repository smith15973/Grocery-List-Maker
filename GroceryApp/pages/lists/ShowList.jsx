import axios from 'axios'
import { useEffect, useState } from 'react'
import { SafeAreaView} from 'react-native'
import { ListOfItems } from './ListOfItems';
import { useNavigation } from '@react-navigation/native';

export function ShowList({ route }) {
    const navigation = useNavigation();

    

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
    navigation.setOptions({ title: list.name })


    const ingredientList = list.ingredients.sort((a, b) => {
        return a.complete === b.complete ? 0 : a.complete ? 1 : -1;
    }).map((ingredient) => ingredient);

    return (
        <SafeAreaView>
            <ListOfItems list={ingredientList} listId={list._id} loadList={loadList} baseURL="http://localhost:3000/lists" />
        </SafeAreaView>




    );
}
