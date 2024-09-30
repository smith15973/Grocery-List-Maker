import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Modal, View } from "react-native";
import { CalendarModal } from "./CalendarModal";
import { RecipeSelect } from "./RecipeSelect";
import { MealTypeSelect } from "./MealTypeSelect";
import { Alert } from "react-native";


export function AddToMenu({ onMenuUpdated }) {



    const [recipes, setRecipes] = useState([])

    async function loadRecipes() {
        const response = await axios.get('http://localhost:3000/recipes');
        setRecipes(response.data);
    }

    useEffect(() => {
        loadRecipes()
    }, [])

    const [addToMenuForm, setAddToMenuForm] = useState({
        date: new Date(new Date().setHours(0, 0, 0, 0)),
        main: '',
        type: '',
    })

    async function addToMenu() {
        try {
            if (!addToMenuForm.main) {
                Alert.alert('Please select a main recipe');
                return
            } else if (!addToMenuForm.type) {
                Alert.alert('Please select a meal type');
                return
            }

            const response = await axios.post('http://localhost:3000/menus', addToMenuForm);
            onMenuUpdated();
            setAddToMenuForm({
                date: new Date(new Date().setHours(0, 0, 0, 0)),
                main: '',
                type: '',
            })
            setModalVisible(false)
        } catch (e) {
            console.log(e)
        }
    }


    function handleChange(name, value) {
        setAddToMenuForm({ ...addToMenuForm, [name]: value })
    }

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View>
            <Button title="+" onPress={() => setModalVisible(true)} />
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
                presentationStyle="formSheet"
            >



                <CalendarModal name="date" onDateChange={handleChange} date={addToMenuForm.date} />
                <RecipeSelect name="main" onRecipeNameChange={handleChange} recipeName={addToMenuForm.main} />
                <MealTypeSelect name="type" onMealTypeChange={handleChange} mealType={addToMenuForm.type} />


                <Button title="Add to Menu" onPress={addToMenu} type="submit" />


            </Modal>
        </View>
    )
}