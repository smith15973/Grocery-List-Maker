import { useEffect, useState } from "react"
import axios from "axios";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ItemInList } from "./ItemInList";


export function IngredientsIndex() {

    const navigation = useNavigation();

    const [ingredients, setIngredients] = useState([]);


    async function loadIngredients() {
        const response = await axios.get('http://localhost:3000/ingredients')
        setIngredients(response.data);
    }


    useEffect(() => {
        loadIngredients();
        // navigation.setOptions({ headerRight: () => <NewListModal onListCreated={loadLists} /> })
    }, [])

    return (
        <ScrollView>
            {ingredients.map(ingredient => {
                return (
                    <ItemInList key={ingredient._id} item={ingredient} onListUpdated={loadIngredients} baseURL="http://localhost:3000/lists" />
                )
            })}
        </ScrollView>
    )
}