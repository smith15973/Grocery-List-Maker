import { useEffect, useState } from "react"
import axios from "axios";
import { Button, View, Text, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NewListModal } from "./NewListModal";
import { ListItemInList } from "./ListItemInList";
export function Lists() {

    const navigation = useNavigation();

    const [lists, setLists] = useState([]);


    async function loadLists() {
        const response = await axios.get('http://localhost:3000/lists')
        setLists(response.data);
    }


    useEffect(() => { 
        loadLists();
        navigation.setOptions({ headerRight: () => <NewListModal onListCreated={loadLists} /> })
     }, [])

    return (
        <ScrollView>
            {lists.map(list => {
                return (
                    <ListItemInList key={list._id} list={list} onListUpdated={loadLists} baseURL="http://localhost:3000/lists" />
                )
            })}
        </ScrollView>
    )
}