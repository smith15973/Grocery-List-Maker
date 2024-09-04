import { useEffect, useState } from "react"
import axios from "axios";
import { Button, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NewListModal } from "./NewListModal";
export function Lists() {

    const navigation = useNavigation();

    const [lists, setLists] = useState([]);
    

    async function loadLists() {
        const response = await axios.get('http://localhost:3000/lists')
        setLists(response.data);
    }

    

    


    useEffect(() => { loadLists() }, [])

    return (

        <View>
            <Text>Lists</Text>
            <NewListModal onListCreated={loadLists} />
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