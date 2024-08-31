import { useEffect, useState } from "react"
import axios from "axios";
import { Button, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
export function Lists() {

    const navigation = useNavigation();

    const [lists, setLists] = useState([])

    async function loadLists() {
        const response = await axios.get('http://localhost:3000/lists')
        setLists(response.data);
    }

    useEffect(() => { loadLists() }, [])

    return (

        <View>
            <Text>Lists</Text>
            <Button title="Create New List"></Button>
            <View>
                {lists.map(list => {
                    return (
                        <Text
                            onPress={() => navigation.navigate('List', { id: list._id })}
                            key={list._id}
                        >{list.name}</Text>
                    )
                })}
            </View>
        </View>
    )
}